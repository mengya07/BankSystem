package com.liaoyun.controller;

import com.liaoyun.domain.AccountUserPassword;
import com.liaoyun.domain.ChangePassword;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.service.EditAppInfoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EditAppInfoController {

    @Autowired
    EditAppInfoService editAppInfoService;


    @RequestMapping("/edit/password")
    @PreAuthorize(value = "hasAuthority('user')")
    ResponseResult editPassword(@RequestBody ChangePassword changePassword, HttpServletRequest request){
        return editAppInfoService.EditAppPassword(changePassword.getVerifyCode(),changePassword.getOldPassword(),changePassword.getNewPassword(),(int)request.getAttribute("userId"));
    }
}
