package com.liaoyun.controller;


import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.User;
import com.liaoyun.service.LoginService;
import com.liaoyun.service.impl.LoginServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    LoginService loginService;
    @PostMapping("/login")
    public ResponseResult login(@RequestBody User user){
        //登录
        return loginService.login(user);
    }

    @RequestMapping("/user/logout")
    public ResponseResult logout(){
        return loginService.logout();
    }

}
