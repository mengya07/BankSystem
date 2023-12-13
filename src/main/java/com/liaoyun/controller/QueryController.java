package com.liaoyun.controller;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liaoyun.domain.*;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.QueryInfoService;
import com.liaoyun.utils.JwtUtil;
import com.liaoyun.utils.TokenToId;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class QueryController {

    @Autowired
    QueryInfoService queryInfo;

    @Autowired
    UserMapper userMapper;

    @Autowired
    TokenToId tokenToId;


    @RequestMapping("/query/balance")
    @PreAuthorize(value = "hasAuthority('user')")
    ResponseResult queryBalance(HttpServletRequest request) throws Exception {
        return queryInfo.queryBalance(tokenToId.toCustomerId( request));
    }

    @RequestMapping("/query/bankCard")
    @PreAuthorize(value = "hasAuthority('user')")
    ResponseResult queryBankCards(HttpServletRequest request) throws Exception {
        return queryInfo.queryBankCards(tokenToId.toCustomerId(request));
    }
    @RequestMapping("/query/customerInfo")
    @PreAuthorize(value = "hasAuthority('user')")
    ResponseResult queryCustomerInfo(HttpServletRequest request) throws Exception {
        return queryInfo.queryPersonalInformation(tokenToId.toCustomerId(request));
    }

    @RequestMapping("/query/transferRecord")
    @PreAuthorize(value = "hasAuthority('user')")
    ResponseResult queryTransferRecord(@RequestBody TransferRecordQueryConditions queryConditions,
                                       @RequestParam int pageNum, @RequestParam int pageSize, HttpServletRequest request) throws Exception {

        return queryInfo.queryTransferRecord(tokenToId.toCustomerId(request),queryConditions,pageNum,pageSize);
    }

    @RequestMapping("/query/cardnumber")
    @PreAuthorize(value = "hasAuthority('user')")
    ResponseResult queryCardNumber(@RequestBody DomainWithVerifyCode domainWithVerifyCode){
        BankCardInfo bankCardInfo = JSONObject.parseObject(JSONObject.toJSONString(domainWithVerifyCode.getPojo()), BankCardInfo.class);
        return queryInfo.queryCardNumberByCardId(domainWithVerifyCode.getVerifyCode(), bankCardInfo.getCardId());
    }
}
