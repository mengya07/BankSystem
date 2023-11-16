package com.liaoyun.controller;

import com.liaoyun.aop.InvokeLog;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.User;
import com.liaoyun.domain.loginUser;
import com.liaoyun.resolver.CurrentUserId;
import com.liaoyun.service.UserService;
import com.liaoyun.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    //加上CrossOrigin实现跨域请求
    @InvokeLog
    @RequestMapping("/findAllUser")
    public List<User> findAllUser(@CurrentUserId String userId) throws Exception {
        System.out.println(userId + " 参数解析");
        return userService.findAll();
    }

    @RequestMapping("/insertUser")
    public ResponseResult insertUser(){
        userService.insert(new User(null,"sscy",708,"jp"));
        System.out.println(1/0);
        userService.insert(new User(null,"123",123,"123"));
        return new ResponseResult<>(200,"添加成功");
    }

    @RequestMapping("/login")
    public ResponseResult login(@RequestBody loginUser user){
        //校验用户名密码是否正确
        loginUser luser = userService.login(user);
        //正确 生成token返回
        Map<String,Object> map = new HashMap<>();
        if(luser != null){
            String token =  JwtUtil.createJWT(UUID.randomUUID().toString(),luser.getId().toString(),null);
            map.put("token",token);
            System.out.println(token);
        }else{
            //不正确，给出提示
            return new ResponseResult(300,"用户名或密码错误",null);
        }
        return new ResponseResult(200,"登录成功",map);
    }
}
