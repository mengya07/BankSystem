package com.liaoyun.service.impl;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.TransferUnit;
import com.liaoyun.domain.dataBaseType.BankCardInfo;
import com.liaoyun.domain.requestType.AmountAndPassword;
import com.liaoyun.domain.requestType.TDPayeeInfo;
import com.liaoyun.domain.responseType.NameAndCardNumber;
import com.liaoyun.domain.responseType.TDOrderId;
import com.liaoyun.mapper.BankCardMapper;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.TDCodeService;
import com.liaoyun.service.TransferMoneyService;
import com.liaoyun.utils.RedisCache;
import com.liaoyun.utils.SnowflakeIdGenerator;
import com.liaoyun.utils.TokenToId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Service
public class TDCodeServiceImpl implements TDCodeService {
    
    @Autowired
    SnowflakeIdGenerator snowflakeIdGenerator;

    @Autowired
    BankCardMapper bankCardMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    RedisCache redisCache;

    @Autowired
    TransferMoneyService transferMoneyService;
    public ResponseResult GenerateTDCode(Integer userId, Integer cardId, Integer customerId){
        //生成订单序号 返回给前端显示二维码
        Long orderId = snowflakeIdGenerator.generateId();
        //先验证一下卡Id和customerId是否匹配
        BankCardInfo bankCardInfo = bankCardMapper.selectSingleBankCard(cardId, customerId);
        if(Objects.isNull(bankCardInfo)){
            throw new RuntimeException("卡Id错误，无法生成二维码");
        }
        //保存该收款码对应的收款方信息
        TDPayeeInfo tdPayeeInfo = new TDPayeeInfo(customerId,cardId);
        //设置二维码有效期1分钟
        redisCache.setCacheObject("TD."+orderId+":",tdPayeeInfo,60, TimeUnit.SECONDS);
        return new ResponseResult<>(200,"二维码",orderId.toString());
    }

    @Override
    public ResponseResult VerifyTDCode(String orderId) {
        TDPayeeInfo tdPayeeInfo = redisCache.getCacheObject("TD."+orderId+":");
        if(Objects.isNull(tdPayeeInfo)){
            return new ResponseResult<>(400,"二维码已过期");
        }
        //查询收款人信息展示给扫码方（付款人）
        NameAndCardNumber nameAndCardNumber = bankCardMapper.selectNameAndCardNumber( tdPayeeInfo.getCardId());
        if(Objects.isNull(nameAndCardNumber)){
            return new ResponseResult(400,"暂无数据");
        }
        return new ResponseResult<>(200,"二维码有效",nameAndCardNumber);
    }

    /**
     * 检验支付密码是否正确
     * @param paymentPassword
     * @param userId
     * @return
     */
    private boolean verifyPaymentPassword(String paymentPassword,Integer userId){
        String encodePassword = userMapper.selectPaymentPassword(userId);
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.matches(paymentPassword,encodePassword);
    }

    @Override
    public ResponseResult TDCodeTransferMoney(AmountAndPassword amountAndPassword, Integer customerId,Integer userId) {
        if(!verifyPaymentPassword(amountAndPassword.getPassword(),userId)){
            return new ResponseResult<>(500,"支付密码错误");
        }
        //取出redis保存的收款方cardId和customerId
        TDPayeeInfo tdPayeeInfo = redisCache.getCacheObject("TD." + amountAndPassword.getOrderId() + ":");
        if(Objects.isNull(tdPayeeInfo)){
            return new ResponseResult<>(500,"转账失败");
        }
        //获取付款方信息（姓名和卡号）
        BankCardInfo payeeBankCardInfo = bankCardMapper.selectSingleBankCard(tdPayeeInfo.getPayeeCustomerId(), tdPayeeInfo.getCardId());
        if(Objects.isNull(payeeBankCardInfo)){
            throw new RuntimeException("二维码信息错误");
        }
        TransferUnit transferUnit = new TransferUnit(customerId,amountAndPassword.getPayerCardId(), payeeBankCardInfo.getCardNumber(),
                payeeBankCardInfo.getCardHolderName(), amountAndPassword.getAmount(),"扫码转账");
        return transferMoneyService.transferMoney(transferUnit);
    }
}
