package com.liaoyun.controller;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.utils.SendSMSCode;
import com.liaoyun.utils.VerificationCodeGenerators;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Controller
//返回值放到响应体，不进行跳转
@RestController
@RequestMapping("/user")
public class TestController {


    @RequestMapping("/test01")
    @PreAuthorize(value = "hasAuthority('user')")
    public String test01(){
        return "test01";
    }

    @RequestMapping("/hentai")
    @PreAuthorize(value = "hasAuthority('hentai')")
    public String test02(){return "hentai 才能访问的controller"; }

    @RequestMapping("/testSms")
    public ResponseResult sendSms(@RequestParam String phoneNumber) throws Exception {
        String vCode = VerificationCodeGenerators.generate();
        SendSMSCode.sendCode(phoneNumber,"{\"verify\":\""+vCode+"\"}");
        return new ResponseResult(200,"验证码已发送");
    }
}
