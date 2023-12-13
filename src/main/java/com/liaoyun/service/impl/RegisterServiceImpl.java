package com.liaoyun.service.impl;

import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.*;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.LoginService;
import com.liaoyun.service.RegisterService;
import com.liaoyun.utils.InfoInspecter;
import com.liaoyun.utils.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    @Override
    @InvokeVerifyCode
    public ResponseResult register(String verifyCode,String phoneNumber) {
        //如果该用户注册过就直接转为登录状态
        if(!Objects.isNull(userMapper.selectOne(phoneNumber))){
            return loginService.loginWithVCode(verifyCode,phoneNumber);
        }

        //注册用户
        userMapper.inserterUserInfo(new AccountUserInfo(phoneNumber,"unbinduser",(byte) 0));
        userMapper.insertUserPassword(new AccountUserPassword(phoneNumber));

        return new ResponseResult<>(100,"账户创建成功");
    }

    @Override
    public ResponseResult identityVerification(CustomerInfo customerInfo) {
        if(InfoInspecter.checkIdentityCard(customerInfo.getIdentityCard())){
            return new ResponseResult(1,"身份证不正确");
        }
        //

        return null;
    }

    @Override
    public ResponseResult bindBankCard(BankCardInfo bankCardInfo) {
        return null;
    }
}
