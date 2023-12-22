package com.liaoyun.service.impl;

import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.dataBaseType.AccountUserInfo;
import com.liaoyun.domain.dataBaseType.AccountUserPassword;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.EditAppInfoService;
import com.liaoyun.utils.InfoInspecter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class EditAppInfoServiceImpl implements EditAppInfoService {
    @Autowired
    UserMapper userMapper;
    @Override
    @InvokeVerifyCode
    public ResponseResult EditAppPassword(String verifyCode,String oldPassword, String newPassword,int userId) {
        //TODO 校验短信验证码

        AccountUserPassword accountUserPassword =  userMapper.selectPasswordByUserId(userId);
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if( !bCryptPasswordEncoder.matches(oldPassword,accountUserPassword.getPassword()) ){
            return new ResponseResult(1,"原密码错误");
        }
        //加密新密码存入数据库
        if( !InfoInspecter.checkPassword(newPassword) ){
            return new ResponseResult(2,"新密码格式错误，请重新输入");
        }
        String encodeNewPassword = bCryptPasswordEncoder.encode(newPassword);
        accountUserPassword.setPassword(encodeNewPassword);
        int result = userMapper.updateAppPassword(accountUserPassword);
        if(result == 1){
            return new ResponseResult<>(200,"密码修改成功，请下次登录时使用");
        }
        return new ResponseResult(3,"密码修改失败");
    }

    @Override
    @Transactional
    public ResponseResult setPaymentPassword(Integer userId, String paymentPassword) {
        System.out.println(paymentPassword);
        if(paymentPassword.length() != 6 ){
            System.out.println("请输入六位数字密码");
        }
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encodePassword = bCryptPasswordEncoder.encode(paymentPassword);
        if(userMapper.updateUserPaymentPassword(userId,encodePassword) != 1){
            throw new RuntimeException("支付密码设置失败");
        }
        //更新用户权限
        if(userMapper.updateAppUserInfo(new AccountUserInfo(userId,"safeuser")) != 1){
            throw new RuntimeException("支付密码设置失败");
        }
        return new ResponseResult<>(200,"支付密码设置成功");
    }


    @Override
    public ResponseResult setLoginPassword(Integer userId, String loginPassword) {
        System.out.println(loginPassword);
        if ( !InfoInspecter.checkPassword(loginPassword) ) {
            return new ResponseResult<>(233,"密码强度弱，请至少使用数字和字母设置密码");
        }
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encodeLoginPassword = bCryptPasswordEncoder.encode(loginPassword);
        if(userMapper.updateAppPassword(new AccountUserPassword(userId,encodeLoginPassword)) != 1){
            throw new RuntimeException("系统错误");
        }

        return new ResponseResult<>(200,"密码设置成功");
    }
}
