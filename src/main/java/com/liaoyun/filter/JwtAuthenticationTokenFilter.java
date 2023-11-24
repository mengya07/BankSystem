package com.liaoyun.filter;

import com.liaoyun.domain.LoginUserDetail;
import com.liaoyun.utils.JwtUtil;
import com.liaoyun.utils.RedisCache;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    RedisCache redisCache;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //获取token
        String token = request.getHeader("token");
        if(!StringUtils.hasText(token)){
            //没有token放行
            filterChain.doFilter(request,response);
            return;
        }
        //解析token
        String userId;
        try {
            Claims claims = JwtUtil.parseJWT(token);
             userId = claims.getSubject();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("token非法");
        }
        //redis中获取用户信息
        String redisKey = "login:" + userId;
        LoginUserDetail loginUserDetail = redisCache.getCacheObject(redisKey);
        if(Objects.isNull(loginUserDetail)){
             //redis里没有，或者id是不对的
            throw new RuntimeException("用户未登录");
        }
        //存入SecurityContextHolder
        //TODO 获取权限信息封装到Authentication
        //选择三个参数的封装方式会吧authenticated设置为true，能通过后面的过滤器
        //loginUserDetail.getAuthorities()将权限信息封装到Authentication中，以便检查是否能访问对应的controller
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                =  new UsernamePasswordAuthenticationToken(loginUserDetail,null,loginUserDetail.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        //过滤了继续执行
        filterChain.doFilter(request,response);
    }
}
