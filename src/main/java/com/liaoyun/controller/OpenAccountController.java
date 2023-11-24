package com.liaoyun.controller;

import com.liaoyun.domain.ResponseResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OpenAccountController {

    @RequestMapping("/operator/openaccount")
    public ResponseResult openAccount(){
        return new ResponseResult<>();
    }
}
