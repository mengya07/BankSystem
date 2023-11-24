package com.liaoyun.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
//返回值放到响应体，不进行跳转
@RestController
@RequestMapping("/user")
public class TestController {


    @RequestMapping("/test01")
    @PreAuthorize(value = "hasAuthority('test')")
    public String test01(){
        return "test01";
    }

    @RequestMapping("/hentai")
    @PreAuthorize(value = "hasAuthority('user')")
    public String test02(){return "hentai 才能访问的controller"; }
}
