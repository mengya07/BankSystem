package com.liaoyun.exceptionhandler;

import com.liaoyun.domain.ResponseResult;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class MyControllerAdvice {
    //指定该方法能处理的异常对象
    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    public ResponseResult handlerException(Exception e){
        //获取异常信息，存放如ResponseResult的msg属性
        String message = e.getMessage();
        ResponseResult result = new ResponseResult(300,message);
        //把ResponseResult作为返回值返回，要求到时候转换成json存入响应体中
        return result;
    }

    @ResponseBody
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseResult handleAccessRE(AccessDeniedException ex){
        System.out.println(ex.getMessage());
        return new ResponseResult(403, "权限不足");
    }
}
