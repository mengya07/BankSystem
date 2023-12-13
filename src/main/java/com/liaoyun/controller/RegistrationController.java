package com.liaoyun.controller;

import com.alibaba.fastjson.JSONObject;
import com.liaoyun.domain.BankCardInfo;
import com.liaoyun.domain.DomainWithVerifyCode;
import com.liaoyun.domain.RegisterInfo;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.service.RegisterService;
import com.liaoyun.utils.InfoInspecter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    @Autowired
    RegisterService registerService;
    @PostMapping("/register")
    //前端页面把注册信息包装成JSON串给后端服务器
    public ResponseResult register(@RequestBody DomainWithVerifyCode domainWithVerifyCode){
        //信息格式错误返回
        String phoneNuber = JSONObject.parseObject(JSONObject.toJSONString(domainWithVerifyCode.getPojo()), String.class);
        if ( !InfoInspecter.checkPhoneNumber(phoneNuber) ) {
            return new ResponseResult<>(1,"手机号码不正确");
        }
        //将验证码存入redis
        return registerService.register(domainWithVerifyCode.getVerifyCode(),phoneNuber);
    }
}
