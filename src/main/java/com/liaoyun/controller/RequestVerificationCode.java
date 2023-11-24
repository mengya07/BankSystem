package com.liaoyun.controller;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.service.VerificationCodeService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RequestVerificationCode {

    private VerificationCodeService verificationCodeService;
    @RequestMapping("/user/requestcode")
    //前端应该传递电话号码和验证码的用途
    public ResponseResult requestCode(@RequestParam String phoneNumber){
        return verificationCodeService.sendCode(phoneNumber);
    }
}
