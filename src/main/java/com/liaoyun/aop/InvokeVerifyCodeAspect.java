package com.liaoyun.aop;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.utils.RedisCache;
import okhttp3.Response;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Objects;

//切面类
@Aspect
@Component
public class InvokeVerifyCodeAspect {

    //确定切点,也就是说带有“com.liaoyun.aop.InvokeLog”注解的方法就是切点
    @Pointcut("@annotation(com.liaoyun.aop.InvokeVerifyCode)")
    public void pt(){}

    @Autowired
    RedisCache redisCache;
    @Around("pt()")
    public ResponseResult printInvokeLog(ProceedingJoinPoint joinPoint){
        //目标方法调用前
        //被调用方法返回值
        Object proceed = null;
        //
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String methodName = signature.getMethod().getName();
        System.out.println(methodName + " 将被调用");
        //短信验证码验证
        Object[] args = joinPoint.getArgs();
        String phoneNumber = null;
        String[] parameterNamesList = signature.getParameterNames();
        for(int i=0; i<parameterNamesList.length; i++){
            String paramName = parameterNamesList[i];
            if(paramName.equals("phoneNumber")){
                phoneNumber = (String)args[i];
                break;
            }
        }
        if(phoneNumber == null){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            phoneNumber= authentication.getName();
        }
        String redisVerifyCode = redisCache.getCacheObject("vCode." + phoneNumber + ":");
        String verifyCode = (String)args[0];
        if(Objects.isNull(redisVerifyCode) || !redisVerifyCode.equals(verifyCode)){
            return new ResponseResult<>(110,"验证码错误");
        }
        try {
            //调用被增强方法
            proceed = joinPoint.proceed();
        } catch (Throwable e) {
            System.out.println(methodName + " 出现异常");
            throw new RuntimeException(e);
        }
        //操作成功后把验证码删除
        redisCache.deleteObject("vCode." + phoneNumber + ":");
        return (ResponseResult) proceed;
    }

}
