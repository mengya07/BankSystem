package com.liaoyun.utils;

import com.liaoyun.mapper.UserMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TokenToId {

    @Autowired
    UserMapper userMapper;
    public  int toCustomerId(String token, HttpServletRequest request) throws Exception {
        int userId = Integer.parseInt(request.getAttribute("userId").toString());
        //根据APP用户ID查银行账户ID(顾客ID)
        int customerId = userMapper.selectCustomerIdByUserId(userId);
        return customerId;
    }

}
