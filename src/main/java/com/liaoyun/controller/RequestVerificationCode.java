//package com.liaoyun.controller;
//
//import com.liaoyun.domain.ResponseResult;
//import com.liaoyun.service.VerificationCodeService;
//import com.liaoyun.utils.InfoInspecter;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class RequestVerificationCode {
//
//    private VerificationCodeService verificationCodeService;
//    @RequestMapping("/user/requestcode")
//    //前端应该传递电话号码和验证码的用途
//    public ResponseResult requestCode(@RequestParam String phoneNumber){
//        //检查一下手机是不是正确的
//        if (!InfoInspecter.checkPhoneNumber(phoneNumber)) {
//            return new ResponseResult(1,"手机号不正确");
//        }
//        return verificationCodeService.sendCode(phoneNumber);
//    }
//}
