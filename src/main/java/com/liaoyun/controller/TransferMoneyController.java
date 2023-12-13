package com.liaoyun.controller;

import com.liaoyun.domain.DomainWithVerifyCode;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.TransferUnit;
import com.liaoyun.service.TransferMoneyService;
import com.liaoyun.utils.TokenToId;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class TransferMoneyController {
    @Autowired
    TransferMoneyService transferMoneyService;

    @Autowired
    TokenToId tokenToId;
    @PostMapping("/user/transferMoney")
    @PreAuthorize(value = "hasAuthority('user')")
    public ResponseResult  TransferMoney(@RequestBody TransferUnit transferUnit, HttpServletRequest request) throws Exception {

        transferUnit.setPayerId(tokenToId.toCustomerId(request));
        return transferMoneyService.transferMoney(transferUnit.getVerifyCode(),transferUnit);
    }
}
