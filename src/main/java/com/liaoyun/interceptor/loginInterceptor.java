package com.liaoyun.interceptor;

import com.liaoyun.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class loginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse
            response, Object handler) throws Exception {
        //获取请求头中的token
        String token = request.getHeader("token");
        //判断token是否为空，如果为空也代表未登录 提醒重新登录（401）
        if(!StringUtils.hasText(token)){
            throw new RuntimeException("未登录，请登录后重试");
        }
        //解析token看看是否成功
        try {
            Claims claims = JwtUtil.parseJWT(token);
            String subject = claims.getSubject();
            System.out.println(subject);
        } catch (Exception e) {
            e.printStackTrace();
        //如果解析过程中没有出现异常说明是登录状态
        //如果出现了异常，说明未登录，提醒重新登录（401）
            //向客户端发送信息
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            throw new RuntimeException("未登录，请登录后重试");
        }
        return true;
    }

}
