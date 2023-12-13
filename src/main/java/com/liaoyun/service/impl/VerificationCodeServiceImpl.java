//package com.liaoyun.service.impl;
//
//import com.liaoyun.domain.ResponseResult;
//import com.liaoyun.service.VerificationCodeService;
//import com.liaoyun.utils.InfoInspecter;
//import com.liaoyun.utils.RedisCache;
//import com.liaoyun.utils.VerificationCodeGenerators;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//@Service
//public class VerificationCodeServiceImpl implements VerificationCodeService {
//
//    private RedisCache redisCache;
//    @Override
//    public ResponseResult sendCode(String phoneNumber) {
//        //验证手机号是否规范
//        if(!InfoInspecter.checkPhoneNumber(phoneNumber)){
//            return new ResponseResult<>(412,"请输入正确的手机号");
//        }
//        //生成验证码
//        String vCode = VerificationCodeGenerators.generate();
//        //存入redis
//        redisCache.setCacheObject(phoneNumber,vCode);
//        if(redisCache.expire(phoneNumber,300)){
//            //超时时间设置失败
//            return new ResponseResult<>(412,"请重试");
//        }
//        //TODO 调用第三方短信发送服务
//
//        //发送验证并响应前端验证码已发送
//        return new ResponseResult<>(200,"验证码已发送");
//    }
//}
