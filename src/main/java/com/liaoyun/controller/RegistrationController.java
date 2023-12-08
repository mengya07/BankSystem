package com.liaoyun.controller;

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
    public ResponseResult register(@RequestBody RegisterInfo registerInfo){
        //信息格式错误返回
        ResponseResult result = InfoInspecter.checkInfo(registerInfo);
        if( result != null){
            return result;
        }
        //将密码加密存储到数据库
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encode = bCryptPasswordEncoder.encode(registerInfo.getAccountUserPassword().getPassword());
        registerInfo.getAccountUserPassword().setPassword(encode);
        return registerService.register(registerInfo);
    }
}
