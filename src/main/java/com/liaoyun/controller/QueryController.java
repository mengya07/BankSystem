package com.liaoyun.controller;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.QueryInfoService;
import com.liaoyun.utils.JwtUtil;
import com.liaoyun.utils.TokenToId;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
public class QueryController {

    @Autowired
    QueryInfoService queryInfo;

    @Autowired
    UserMapper userMapper;

    @Autowired
    TokenToId tokenToId;


    @RequestMapping("/query/balance")
    ResponseResult queryBalance(@RequestHeader("token") String token, HttpServletRequest request) throws Exception {
        return queryInfo.queryBalance(tokenToId.toCustomerId(token, request));
    }

    @RequestMapping("/query/bankCard")
    ResponseResult queryBankCards(@RequestHeader("token") String token, HttpServletRequest request) throws Exception {
        return queryInfo.queryBankCards(tokenToId.toCustomerId(token, request));
    }
    @RequestMapping("/query/customerInfo")
    ResponseResult queryCustomerInfo(@RequestHeader("token") String token, HttpServletRequest request) throws Exception {
        return queryInfo.queryPersonalInformation(tokenToId.toCustomerId(token, request));
    }

    @RequestMapping("/query/transferTransaction")
    ResponseResult querytransferTransaction(){return null;}
}
