package com.liaoyun.utils;

import com.liaoyun.mapper.UserMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class TokenToId {

    @Autowired
    UserMapper userMapper;
    public  Integer toCustomerId( HttpServletRequest request) throws Exception {
        Integer userId = Integer.parseInt(request.getAttribute("userId").toString());
        //根据APP用户ID查银行账户ID(顾客ID)
        Integer customerId = userMapper.selectCustomerIdByUserId(userId);
        if(Objects.isNull(customerId)){
            throw new RuntimeException("系统错误");
        }
        return customerId;
    }

}
