package com.liaoyun.service.impl;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.SendSmsService;
import com.liaoyun.utils.RedisCache;
import com.liaoyun.utils.SendSMSCode;
import com.liaoyun.utils.VerificationCodeGenerators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SendSmsServiceImpl implements SendSmsService {

    @Autowired
    RedisCache redisCache;

    @Override
    public ResponseResult sendSms(String phoneNumber) throws Exception {
        //先校验是否已有该手机号的验证码
        String haveVCode = (String) redisCache.getCacheObject("vCode." + phoneNumber + ":");
        if(haveVCode != null){
            return send(phoneNumber,haveVCode);
        }
        String vCode = VerificationCodeGenerators.generate();
        return send(phoneNumber,vCode);
    }

    private ResponseResult send(String phoneNumber,String vCode) throws Exception {
        if(SendSMSCode.sendCode(phoneNumber,"{\"verify\":\""+vCode+"\"}")){
            redisCache.setCacheObject("vCode."+phoneNumber+":",vCode);
            redisCache.expire("vCode."+phoneNumber+":",3000);
            return new ResponseResult<>(200,"短信发送成功");
        }
        return new ResponseResult<>(1,"短信发送失败");
    }
}
