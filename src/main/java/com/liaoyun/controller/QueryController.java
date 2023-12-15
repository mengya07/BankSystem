package com.liaoyun.controller;

import com.alibaba.fastjson.JSONObject;
import com.liaoyun.domain.*;
import com.liaoyun.domain.requestType.TransferRecordQueryConditions;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.QueryInfoService;
import com.liaoyun.utils.TokenToId;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class QueryController {

    @Autowired
    QueryInfoService queryInfo;

    @Autowired
    UserMapper userMapper;

    @Autowired
    TokenToId tokenToId;


    @RequestMapping("/query/singleCard")
    @PreAuthorize(value = "hasAuthority('user')")
    ResponseResult querySingleCard(@RequestParam Integer cardId, HttpServletRequest request) throws Exception {
        return queryInfo.querySingleBankCard(tokenToId.toCustomerId(request),cardId);
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
        int cardId = JSONObject.parseObject(JSONObject.toJSONString(domainWithVerifyCode.getPojo()), Integer.class);
        return queryInfo.queryCardNumberByCardId(domainWithVerifyCode.getVerifyCode(), cardId);
    }

    @RequestMapping("/query/transactionDetails")
    ResponseResult queryTransactionDetails(@RequestParam Integer transactionId,HttpServletRequest request) throws Exception {
        return queryInfo.queryTransactionDetails(transactionId,tokenToId.toCustomerId(request));
    }
}
