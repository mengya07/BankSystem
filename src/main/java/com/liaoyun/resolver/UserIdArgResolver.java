package com.liaoyun.resolver;

import com.liaoyun.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

//当一个请求到达，实现HandlerMethodArgumentResolver的会被遍历,如果这个请求的参数被相应的注解标识
//就可以使用resolveArgument函数给这个参数赋值
@Component
public class UserIdArgResolver implements HandlerMethodArgumentResolver {

    //支持什么参数(Spring帮你封装什么东西进parameter)
    @Override
    public boolean supportsParameter(MethodParameter parameter) {

        return parameter.hasParameterAnnotation(CurrentUserId.class);
    }

    //进行参数解析的方法,获取对应数据,返回给对应方法参数
    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String token =webRequest.getHeader("token");
        if(StringUtils.hasText(token)){
            Claims claims = JwtUtil.parseJWT(token);
            String userId = claims.getSubject();
            return userId;
        }
        return null;
    }
}
