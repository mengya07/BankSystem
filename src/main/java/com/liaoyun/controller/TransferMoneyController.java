package com.liaoyun.controller;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.TransferUnit;
import com.liaoyun.service.TransferMoneyService;
import com.liaoyun.utils.TokenToId;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransferMoneyController {
    @Autowired
    TransferMoneyService transferMoneyService;

    @Autowired
    TokenToId tokenToId;
    @RequestMapping("/user/transferMoney")
    public ResponseResult  TransferMoney(@RequestBody TransferUnit transferUnit, HttpServletRequest request) throws Exception {
        //TODO 验证验证码是否正确

        transferUnit.setPayerId(tokenToId.toCustomerId(request));
        return transferMoneyService.transferMoney(transferUnit);
    }
}
