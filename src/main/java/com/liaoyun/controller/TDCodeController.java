package com.liaoyun.controller;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.requestType.AmountAndPassword;
import com.liaoyun.service.TDCodeService;
import com.liaoyun.utils.TokenToId;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class TDCodeController {

    @Autowired
    TDCodeService tdCodeService;

    @Autowired
    TokenToId tokenToId;
    @RequestMapping("/TDCode/generate")
    @PreAuthorize(value = "hasAuthority('safeuser')" )
    public ResponseResult generateTDCode(@RequestParam Integer cardId, HttpServletRequest request) throws Exception {
        return tdCodeService.GenerateTDCode((Integer) request.getAttribute("userId"),cardId, tokenToId.toCustomerId(request));
    }

    @RequestMapping("/TDCode/verify")
    @PreAuthorize(value = "hasAuthority('safeuser')" )
    public ResponseResult verifyTDCode(@RequestParam String orderId) throws Exception {
        return tdCodeService.VerifyTDCode(orderId);
    }

    @PostMapping("/TDCode/transferMoney")
    @PreAuthorize(value = "hasAuthority('safeuser')" )
    public ResponseResult transferMoney(@RequestBody AmountAndPassword amountAndPassword, HttpServletRequest request) throws Exception {
        return tdCodeService.TDCodeTransferMoney(amountAndPassword,tokenToId.toCustomerId(request),(Integer) request.getAttribute("userId"));
    }

}
