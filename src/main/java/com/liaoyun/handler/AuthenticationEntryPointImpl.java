package com.liaoyun.handler;

import com.alibaba.fastjson.JSON;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.utils.WebUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        //认证失败处理逻辑

        ResponseResult result = new ResponseResult(401,"认证失败，请登录");
        String jsonString = JSON.toJSONString(result);
        //写入响应体
        WebUtils.renderString(response,jsonString);
    }
}
