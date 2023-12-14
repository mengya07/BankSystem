package com.liaoyun.controller;

import com.alibaba.fastjson.JSONObject;
import com.liaoyun.domain.*;
import com.liaoyun.service.RegisterService;
import com.liaoyun.utils.InfoInspecter;
import com.liaoyun.utils.TokenToId;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    @Autowired
    RegisterService registerService;

    @Autowired
    TokenToId tokenToId;
    @PostMapping("/register/appaccount")
    //前端页面把注册信息包装成JSON串给后端服务器
    public ResponseResult register(@RequestBody DomainWithVerifyCode domainWithVerifyCode){
        //信息格式错误返回
        String phoneNumber = JSONObject.parseObject(JSONObject.toJSONString(domainWithVerifyCode.getPojo()), String.class);
        if ( !InfoInspecter.checkPhoneNumber(phoneNumber) ) {
            return new ResponseResult<>(1,"手机号码不正确");
        }
        //将验证码存入redis
        return registerService.register(domainWithVerifyCode.getVerifyCode(),phoneNumber);
    }

    @PostMapping("/register/identityverification")
    @PreAuthorize(value = "hasAuthority('unbinduser')")
    public ResponseResult identityVerification(@RequestBody RealNameAuthentication realNameAuthentication,HttpServletRequest request){
        return registerService.identityVerification(realNameAuthentication,(Integer) request.getAttribute("userId"));
    }

    @PostMapping("/register/verifyCardAndIdentity")
    @PreAuthorize(value = "hasAuthority('unbinduser')")
    public ResponseResult verifyCardAndIdentity(@RequestBody DomainWithVerifyCode domainWithVerifyCode, HttpServletRequest request) {
        AddBankCardInfo addBankCardInfo = JSONObject.parseObject(JSONObject.toJSONString(domainWithVerifyCode.getPojo()), AddBankCardInfo.class);
        return registerService.verifyCardAndIdentity(domainWithVerifyCode.getVerifyCode(),addBankCardInfo.getPhoneNumber(),addBankCardInfo,(Integer) request.getAttribute("userId"));
    }


    @PostMapping("/register/addBankCard")
    @PreAuthorize(value = "hasAuthority('user')")
    public ResponseResult addBankCard(@RequestBody DomainWithVerifyCode domainWithVerifyCode,HttpServletRequest request) throws Exception {
        AddBankCardInfo addBankCardInfo = JSONObject.parseObject(JSONObject.toJSONString(domainWithVerifyCode.getPojo()), AddBankCardInfo.class);
        return registerService.addBankCard(domainWithVerifyCode.getVerifyCode(),addBankCardInfo.getPhoneNumber(),addBankCardInfo,tokenToId.toCustomerId(request));
    }
}
