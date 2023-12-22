package com.liaoyun.controller;

import com.alibaba.fastjson.JSONObject;
import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.*;
import com.liaoyun.domain.dataBaseType.CustomerInfo;
import com.liaoyun.domain.requestType.RegisterInfo;
import com.liaoyun.service.RegisterService;
import com.liaoyun.utils.InfoInspecter;
import com.liaoyun.utils.TokenToId;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
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
    @PostMapping("/register/appAccount")
    //前端页面把注册信息包装成JSON串给后端服务器
    public ResponseResult register(@RequestBody DomainWithVerifyCode domainWithVerifyCode){
        //信息格式错误返回
        String phoneNumber = domainWithVerifyCode.getPhoneNumber();
        return registerService.register(domainWithVerifyCode.getVerifyCode(),phoneNumber);
    }

    @PostMapping("/register/identityVerification")
    @PreAuthorize(value = "hasAuthority('unbinduser')")
    public ResponseResult identityVerification(@RequestBody RealNameAuthentication realNameAuthentication,HttpServletRequest request){
        return registerService.identityVerification(realNameAuthentication,(Integer) request.getAttribute("userId"));
    }

    @PostMapping("/register/verifyCardAndIdentity")
    @PreAuthorize(value = "hasAuthority('unbinduser')")
    public ResponseResult verifyCardAndIdentity(@RequestBody AddBankCardInfo addBankCardInfo, HttpServletRequest request) {
        return registerService.verifyCardAndIdentity(addBankCardInfo,(Integer) request.getAttribute("userId"));
    }

    @PostMapping("/register/bindBankCardForIdentity")
    @PreAuthorize(value = "hasAuthority('unbinduser')" )
    public ResponseResult bindBankCardForIdentity(@RequestBody DomainWithVerifyCode domainWithVerifyCode,HttpServletRequest request){
        return registerService.bindBankCard(domainWithVerifyCode.getVerifyCode(),domainWithVerifyCode.getPhoneNumber(),(Integer) request.getAttribute("userId"));
    }
    @PostMapping("/register/addBankCard")
    @PreAuthorize(value = "hasAuthority('unbinduser')" )
    public ResponseResult addBankCard(@RequestBody AddBankCardInfo addBankCardInfo,HttpServletRequest request) throws Exception {
        return registerService.addBankCard(addBankCardInfo,tokenToId.toCustomerId(request));
    }

    @PostMapping("/register/addBankCardVerify")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    public ResponseResult addBankCardVerify(@RequestBody DomainWithVerifyCode domainWithVerifyCode,HttpServletRequest request) throws Exception {
        return registerService.addBankCardVerify(domainWithVerifyCode.getVerifyCode(),domainWithVerifyCode.getPhoneNumber(),tokenToId.toCustomerId(request));
    }

    @PostMapping("/edit/customerInfo")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    public ResponseResult editCustomerInfo(@RequestBody DomainWithVerifyCode domainWithVerifyCode,HttpServletRequest request) throws Exception {
        CustomerInfo customerInfo = JSONObject.parseObject(JSONObject.toJSONString(domainWithVerifyCode.getPojo()), CustomerInfo.class);
        return registerService.updateCustomerInfo(domainWithVerifyCode.getVerifyCode(),customerInfo,tokenToId.toCustomerId(request));
    }

}
