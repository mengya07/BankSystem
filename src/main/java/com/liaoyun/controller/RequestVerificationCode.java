package com.liaoyun.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RequestVerificationCode {

    @RequestMapping("/user/RegisterCode")
    public void requestCode(String phoneNumber){

    }
}
