package com.liaoyun.filter;

import com.liaoyun.domain.LoginUserDetail;
import com.liaoyun.utils.JwtUtil;
import com.liaoyun.utils.RedisCache;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    RedisCache redisCache;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        //防止同一ip多次访问
        String ipAddress = request.getRemoteAddr();
        Integer accessFrequency = redisCache.getCacheObject(ipAddress);
        if(Objects.isNull(accessFrequency)){
            accessFrequency = 1;
        }
        redisCache.setCacheObject(ipAddress,accessFrequency+1,1, TimeUnit.SECONDS);

        accessFrequency = redisCache.getCacheObject(ipAddress);
        if(accessFrequency >=50 ){
            redisCache.setCacheObject(ipAddress,accessFrequency+1,1500,TimeUnit.SECONDS);
            throw new RuntimeException("禁止频繁访问");
        }

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
        //验证token是否是最新的token
        String redisTokenKey = "validToken:"+ userId;
        String validToken = redisCache.getCacheObject(redisTokenKey);
        String[] jwtSection = token.split("\\.");
        String signature = jwtSection[jwtSection.length - 1];
        if(!signature.equals(validToken)){//判断当前token是否是过期的token
            filterChain.doFilter(request,response);
            return;
        }
        //redis中获取用户信息
        String redisKey = "login:" + userId;
        LoginUserDetail loginUserDetail = redisCache.getCacheObject(redisKey);
        if(Objects.isNull(loginUserDetail)){
             //redis里没有，或者id是不对的
            throw new RuntimeException("用户未登录");
        }


        //获取权限信息封装到Authentication
        //选择三个参数的封装方式会吧authenticated设置为true，能通过后面的过滤器
        //loginUserDetail.getAuthorities()将权限信息封装到Authentication中，以便检查是否能访问对应的controller
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                =  new UsernamePasswordAuthenticationToken(loginUserDetail,null,loginUserDetail.getAuthorities());
        //存入SecurityContextHolder,这样controller能获取到
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        //将解析出来的UserId放入request域中
        request.setAttribute("userId",Integer.parseInt(userId));
        //过滤了继续执行
        filterChain.doFilter(request,response);
    }
}
