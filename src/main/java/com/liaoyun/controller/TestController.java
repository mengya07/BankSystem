package com.liaoyun.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
//返回值放到响应体，不进行跳转
@RestController
public class TestController {

    @RequestMapping("/test01")
    public String test01(){
        return "test01";
    }
}
