package com.liaoyun.handler;

import com.alibaba.fastjson.JSON;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.utils.WebUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        //授权失败处理逻辑

        ResponseResult result = new ResponseResult(403,"权限不足");
        String jsonString = JSON.toJSONString(result);
        //写入响应体
        WebUtils.renderString(response,jsonString);
    }
}
