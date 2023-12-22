package com.liaoyun.service.impl;

import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.*;
import com.liaoyun.domain.dataBaseType.AccountUserInfo;
import com.liaoyun.domain.dataBaseType.AccountUserPassword;
import com.liaoyun.domain.dataBaseType.BankCardInfo;
import com.liaoyun.domain.dataBaseType.CustomerInfo;
import com.liaoyun.mapper.BankCardMapper;
import com.liaoyun.mapper.CustomerInfoMapper;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.CheckBankCardService;
import com.liaoyun.service.LoginService;
import com.liaoyun.service.RegisterService;
import com.liaoyun.utils.InfoInspecter;
import com.liaoyun.utils.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

/**
 * 注册服务类
 */
@Service
@Transactional
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    RedisCache redisCache;

    @Autowired
    LoginService loginService;

    @Autowired
    CustomerInfoMapper customerInfoMapper;

    @Autowired
    CheckBankCardService checkBankCardService;

    @Autowired
    BankCardMapper bankCardMapper;

    @Override
    @InvokeVerifyCode
    public ResponseResult register(String verifyCode,String phoneNumber) {
        if ( !InfoInspecter.checkPhoneNumber(phoneNumber) ) {
            return new ResponseResult<>(1,"手机号码不正确");
        }
        //如果该用户注册过就直接转为登录状态
        if(!Objects.isNull(userMapper.selectOne(phoneNumber))){
            return loginService.loginAfterRegister(phoneNumber);
        }
        //注册用户
        userMapper.inserterUserInfo(new AccountUserInfo(0,phoneNumber,null,null,"unbinduser",(byte) 0));
        userMapper.insertUserPassword(new AccountUserPassword(phoneNumber));
        userMapper.inserterUserPaymentPassword();
        //转为登录状态
        return loginService.loginAfterRegister(phoneNumber);
    }

    @Override
    public ResponseResult identityVerification(RealNameAuthentication realNameAuthentication,Integer userId) {
        if(!InfoInspecter.checkIdentityCard(realNameAuthentication.getIdentityCard())){
            return new ResponseResult(1,"身份证不正确");
        }
        //判断是否已经实名认证(应该去用户表查，如果用户表已经有该身份证,说明已经注册过)
        if(userMapper.selectIdentityExits(realNameAuthentication.getIdentityCard())){
            return new ResponseResult(2,"您的身份信息已注册，请使用已注册手机号登录，或前往我行柜台更改手机号");
        }

        //保存身份信息(姓名，身份证),后面用户提交银行卡信息的时候进行匹配
        redisCache.setCacheObject("Temp.identityInfo."+userId+":",realNameAuthentication);
        redisCache.expire("Temp.identityInfo."+userId+":",3000);
        return new ResponseResult(200,"OK");
    }

    @Override
    public ResponseResult verifyCardAndIdentity( AddBankCardInfo addBankCardInfo, int userId) {
        //取出保存的用户姓名和身份证号
        RealNameAuthentication realNameAuthentication = redisCache.getCacheObject("Temp.identityInfo."+userId+":");
        if(Objects.isNull(realNameAuthentication)){
            //TODO 记录日志
            return new ResponseResult<>(300,"系统错误，请稍后重试");
        }
        //验证银行卡号是否正确
        if (!InfoInspecter.checkBankCard(addBankCardInfo.getCardNumber())) {
            return new ResponseResult<>(3,"银行卡号错误");
        }
        //验证银行卡密码是否正确,正确返回银行卡信息（包含持卡顾客ID,顾客预留手机号，卡ID）
        BankCardInfo bankCardInfo = checkBankCardService.checkCardNumberAndPassword(addBankCardInfo.getCardNumber(),addBankCardInfo.getPassword());
        if (Objects.isNull(bankCardInfo)) {
            return new ResponseResult<>(4,"银行卡密码错误");
        }
        //验证该银行卡是否已经绑定
        if(bankCardInfo.getIsBind()== (byte) '1' ){
            return new ResponseResult(5,"该银行卡已无可关联账户");
        }
        //验证根据该银行卡查出来的身份信息和顾客提供的身份信息是否相符
        CustomerInfo customerInfo = userMapper.selectCustomerInfo(bankCardInfo.getCustomerId());
        if( !(customerInfo.getIdentityCard().equals(realNameAuthentication.getIdentityCard()) &&
        customerInfo.getSurname().equals(realNameAuthentication.getSurname()) &&
        customerInfo.getName().equals(realNameAuthentication.getName()) ) ){
            return new ResponseResult(6,"您的身份证件信息与银行卡开户预留信息不符");
        }
        //卡和人验证通过  更新数据库
        realNameAuthentication.setCustomerId(bankCardInfo.getCustomerId());
        realNameAuthentication.setCardId(bankCardInfo.getCardId());
        realNameAuthentication.setReservePhoneNumber(bankCardInfo.getReservePhoneNumber());
        //保存身份信息(姓名，身份证),后面用户提交银行卡信息的时候进行匹配
        redisCache.setCacheObject("Temp.identityInfo."+userId+":",realNameAuthentication);
        redisCache.expire("Temp.identityInfo."+userId+":",3000);
        return new ResponseResult(200,"实名信息有效");
    }

    @Override
    @InvokeVerifyCode
    public ResponseResult bindBankCard(String verifyCode,String phoneNumber,int userId) throws RuntimeException{
        //取出（实名信息和提供的银行卡匹配）保存的用户姓名和身份证号,顾客ID,银行卡ID,预留手机号
        RealNameAuthentication realNameAuthentication = redisCache.getCacheObject("Temp.identityInfo."+userId+":");
        if(Objects.isNull(realNameAuthentication) || realNameAuthentication.getCustomerId() == 0 || realNameAuthentication.getCardId() == 0){
            //TODO 记录日志
            return new ResponseResult(233,"系统错误,请重试");
        }
        if(!realNameAuthentication.getReservePhoneNumber().equals(phoneNumber)){
            return new ResponseResult(7,"手机号与银行预留手机号不符,如果已更换手机号请持相关证件到柜台办理");
        }
        int record = 0;
        record = record + userMapper.updateAppUserInfo(new AccountUserInfo(userId,null,realNameAuthentication.getIdentityCard(),
                realNameAuthentication.getCustomerId(),"user", (byte) 1));
        //不更新银行卡是否激活，更新银行卡绑定状态
        record = record + bankCardMapper.updateBankCardStatus( (byte) -1, (byte) 1,realNameAuthentication.getCardId());
        if(record != 2){
            //TODO 记录日志
            throw new RuntimeException("账号绑定失败");
        }
        return new ResponseResult(200,"OK");
    }


    @Override
    public ResponseResult addBankCard( AddBankCardInfo addBankCardInfo, int customerId) {

        if (!InfoInspecter.checkBankCard(addBankCardInfo.getCardNumber())) {
            return new ResponseResult(3,"银行卡号不正确");
        }
        BankCardInfo bankCardInfo = checkBankCardService.checkCardNumberAndPassword(addBankCardInfo.getCardNumber(), addBankCardInfo.getPassword());
        if(Objects.isNull(bankCardInfo)){
            return new ResponseResult(4,"银行卡密码错误");
        }else if(bankCardInfo.getIsBind() == (byte) 1){
            //银行卡是否已绑定
            return new ResponseResult(5,"银行卡无可关联账户");
        }else if(bankCardInfo.getCustomerId() != customerId){
            //是不是自己的银行卡
            return new ResponseResult<>(6,"您的身份证件信息与银行卡开户预留信息不符");
        }else if(bankCardMapper.updateBankCardStatus((byte) -1,(byte) 1,bankCardInfo.getCardId()) != 1){
            return new ResponseResult(300,"系统错误,稍后重试");
        }

        //保存该用户要绑定的卡ID，留着后边验证手机号用
        ReservePhoneAndCardId reservePhoneAndCardId = new ReservePhoneAndCardId(bankCardInfo.getReservePhoneNumber(), bankCardInfo.getCardId());
        redisCache.setCacheObject("Temp.binCardId."+customerId+":",reservePhoneAndCardId);
        redisCache.expire("Temp.identityInfo."+customerId+":",300);
        return new ResponseResult(200,"OK");
    }


    @Override
    @InvokeVerifyCode
    public ResponseResult addBankCardVerify(String verifyCode, String phoneNumber, Integer customerId) {
        ReservePhoneAndCardId reservePhoneAndCardId = redisCache.getCacheObject("Temp.binCardId."+customerId+":");
        if(Objects.isNull(reservePhoneAndCardId)){
            return new ResponseResult<>(300,"系统错误,请稍后重试");
        }
        if(!reservePhoneAndCardId.getReservePhoneNumber().equals(phoneNumber)){
            return new ResponseResult<>(7,"手机号与银行预留手机号不符,如果已更换手机号请持相关证件到柜台办理");
        }
        //手机号验证通过,更改卡的绑定状态
        if(Objects.isNull(bankCardMapper.updateBankCardStatus((byte) -1,(byte) 1, reservePhoneAndCardId.getCardId())
        )){
            return new ResponseResult<>(300,"系统错误,请稍后重试");
        }
        return new ResponseResult(200,"绑定成功");
    }

    @Override
//    @InvokeVerifyCode
    public ResponseResult updateCustomerInfo(String verifyCode,CustomerInfo customerInfo, Integer customerId) {
        Integer record = customerInfoMapper.updateCustomerInfo(customerInfo, customerId);
        if(record != 1){
            throw new RuntimeException("系统错误");
        }
        return new ResponseResult(200,"修改个人信息成功");
    }
}
