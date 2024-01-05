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
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    ResponseResult querySingleCard(@RequestParam Integer cardId, HttpServletRequest request) throws Exception {
        return queryInfo.querySingleBankCard(tokenToId.toCustomerId(request),cardId);
    }

    @RequestMapping("/query/bankCard")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    ResponseResult queryBankCards(HttpServletRequest request) throws Exception {
        return queryInfo.queryBankCards(tokenToId.toCustomerId(request));
    }
//    @RequestMapping("/query/customerInfo")
//    @PreAuthorize(value = "hasAuthority('user')")
//    ResponseResult queryCustomerInfo(HttpServletRequest request) throws Exception {
//        return queryInfo.queryPersonalInformation(tokenToId.toCustomerId(request));
//    }

    @RequestMapping("/query/transferRecord")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    ResponseResult queryTransferRecord(@RequestBody TransferRecordQueryConditions queryConditions,
                                       @RequestParam int pageNum, @RequestParam int pageSize, HttpServletRequest request) throws Exception {

        return queryInfo.queryTransferRecord(tokenToId.toCustomerId(request),queryConditions,pageNum,pageSize);
    }

    @RequestMapping("/query/cardNumber")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    ResponseResult queryCardNumber(@RequestBody DomainWithVerifyCode domainWithVerifyCode){
        Integer cardId = domainWithVerifyCode.getCardId();
        return queryInfo.queryCardNumberByCardId(domainWithVerifyCode.getVerifyCode(), cardId);
    }

    @RequestMapping("/query/transferRecordDetail")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    ResponseResult queryTransferDetails(@RequestParam String transactionId,HttpServletRequest request) throws Exception {
        return queryInfo.queryTransferRecordDetail(transactionId,tokenToId.toCustomerId(request));
    }

    @RequestMapping("/query/transactionRecord")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    ResponseResult queryTransaction(@RequestBody TransferRecordQueryConditions queryConditions,
                                    @RequestParam int pageNum, @RequestParam int pageSize, HttpServletRequest request) throws Exception {
        return queryInfo.queryTransactionRecord(tokenToId.toCustomerId(request),queryConditions,pageNum,pageSize);
    }

    /**
     * 查询交易明细的单条记录的详细信息
     * @param transactionId
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/query/transactionDetail")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    ResponseResult queryTransaction(@RequestParam String transactionId,HttpServletRequest request) throws Exception {
        return queryInfo.queryTransactionRecordDetail(transactionId,tokenToId.toCustomerId(request));
    }

    @RequestMapping("/query/customerInfo")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    ResponseResult queryCustomerInfo(HttpServletRequest request) throws Exception {
        return queryInfo.queryCustomerInfo(tokenToId.toCustomerId(request));
    }

    @RequestMapping("/query/monthlycheck")
    @PreAuthorize(value = "hasAnyAuthority('user','safeuser')")
    ResponseResult queryMonthlyCheck(HttpServletRequest request) throws Exception {
        return queryInfo.queryMonthlyCheck(tokenToId.toCustomerId(request));
    }
}
