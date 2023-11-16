package com.liaoyun.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

//切面类
@Aspect
@Component
public class InvokeLogAspect {

    //确定切点,也就是说带有“com.liaoyun.aop.InvokeLog”注解的方法就是切点
    @Pointcut("@annotation(com.liaoyun.aop.InvokeLog)")
    public void pt(){}

    @Around("pt()")
    public Object printInvokeLog(ProceedingJoinPoint joinPoint){
        //目标方法调用前
        //被调用方法返回值
        Object proceed = null;
        //
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String methodName = signature.getMethod().getName();
        System.out.println(methodName + " 将被调用");

        try {
            //调用被增强方法
            proceed = joinPoint.proceed();
        } catch (Throwable e) {
            System.out.println(methodName + " 出现异常");
            throw new RuntimeException(e);
        }
        //目标方法调用后
        System.out.println(methodName + " 调用完");
        return proceed;
    }

}
