package com.liaoyun.controller;

import com.liaoyun.domain.ChangePassword;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.requestType.Password;
import com.liaoyun.service.EditAppInfoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EditAppInfoController {

    @Autowired
    EditAppInfoService editAppInfoService;


    @RequestMapping("/edit/password")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    ResponseResult editPassword(@RequestBody ChangePassword changePassword, HttpServletRequest request){
        return editAppInfoService.EditAppPassword(changePassword.getVerifyCode(),changePassword.getOldPassword(),changePassword.getNewPassword(),(int)request.getAttribute("userId"));
    }

    @RequestMapping("/edit/setPaymentPassword")
    @PreAuthorize(value = "hasAnyAuthority('user')")
    ResponseResult setPaymentPassword(@RequestBody Password password, HttpServletRequest request){
        return editAppInfoService.setPaymentPassword((Integer)request.getAttribute("userId"),password.getPaymentPassword());
    }

    @RequestMapping("/edit/setLoginPassword")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser','unbinduser')")
    ResponseResult changePaymentPassword(@RequestBody Password password,HttpServletRequest request){
        return editAppInfoService.setLoginPassword((Integer)request.getAttribute("userId"),password.getLoginPassword());
    }

}
