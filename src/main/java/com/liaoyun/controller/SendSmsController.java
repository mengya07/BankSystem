package com.liaoyun.controller;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.service.SendSmsService;
import com.liaoyun.utils.InfoInspecter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class SendSmsController {

    @Autowired
    SendSmsService sendSmsService;

    @RequestMapping("/sendsms/nologin")
    public ResponseResult sendSmsNoLogin(@RequestParam String phoneNumber) throws Exception {
        if (!InfoInspecter.checkPhoneNumber(phoneNumber)) {
            return new ResponseResult(1,"手机号不正确");
        }
        return sendSmsService.sendSms(phoneNumber);
    }

    @RequestMapping("/sendsms/login")
    public ResponseResult sendSmsLogin() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String phoneNumber = authentication.getName();
        if (!InfoInspecter.checkPhoneNumber(phoneNumber)) {
            return new ResponseResult(1,"手机号不正确");
        }
        return sendSmsService.sendSms(phoneNumber);
    }

}
