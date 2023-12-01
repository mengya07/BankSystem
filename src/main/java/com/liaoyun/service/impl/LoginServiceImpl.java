package com.liaoyun.service.impl;

import com.liaoyun.domain.AccountUserPassword;
import com.liaoyun.domain.LoginUserDetail;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.User;
import com.liaoyun.service.LoginService;
import com.liaoyun.utils.JwtUtil;
import com.liaoyun.utils.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Objects;

@Service
public class LoginServiceImpl implements LoginService {



    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RedisCache redisCache;
    @Override
    public ResponseResult login(AccountUserPassword user) {
        //封装成Authentication对象
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getUserName(),user.getPassword());
        //这里利用了自己写的UserServiceDetailImpl去查了数据库，并在provider里验证了密码，如果正确就带回来用户信息和权限信息
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);
        if(Objects.isNull(authenticate)){
            throw new RuntimeException("登录失败");
        }else{

        }
        //使用userid生成token
        LoginUserDetail loginUser = (LoginUserDetail) authenticate.getPrincipal();
        String userId = Integer.toString(loginUser.getUser().getUserId());
        //根据userId生成jwt对象
        String jwt = JwtUtil.createJWT(userId);
        //authenticate存入redis
        redisCache.setCacheObject("login:"+userId,loginUser);
        //把token封装成map响应给前端
        HashMap<String,String> map = new HashMap<>();
        map.put("token",jwt);
        return new ResponseResult(200,"登陆成功",map);
    }

    @Override
    public ResponseResult logout() {
        //获取securityContextHolder用户id
        UsernamePasswordAuthenticationToken authentication
                = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        LoginUserDetail loginUserDetail = (LoginUserDetail) authentication.getPrincipal();
        int userId = loginUserDetail.getUser().getUserId();
        //删除redis用户信息
        String redisKet = "login:" + userId;
        redisCache.deleteObject(redisKet);
        return new ResponseResult(200,"注销成功");
    }
}
