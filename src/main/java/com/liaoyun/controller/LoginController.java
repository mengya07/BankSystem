package com.liaoyun.controller;


import com.liaoyun.domain.DomainWithVerifyCode;
import com.liaoyun.domain.dataBaseType.AccountUserPassword;
import com.liaoyun.domain.MobilePhoneCode;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    LoginService loginService;
    @PostMapping("/login")
    public ResponseResult login(@RequestBody AccountUserPassword user){
        //登录
        return loginService.login(user);
    }

    @PostMapping("/vcodelogin")
    public ResponseResult vCodeLogin(@RequestBody DomainWithVerifyCode domainWithVerifyCode){
        return loginService.loginWithVCode( domainWithVerifyCode.getVerifyCode(),domainWithVerifyCode.getPhoneNumber());
    }

    @RequestMapping("/user/logout")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser','unbinduser')")
    public ResponseResult logout(){
        return loginService.logout();
    }


}
