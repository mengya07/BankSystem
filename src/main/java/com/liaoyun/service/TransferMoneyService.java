package com.liaoyun.service;


import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.TransferUnit;

import java.math.BigDecimal;

public interface TransferMoneyService {
     static final Integer commonTransfer = 0;
     static final Integer TDCodeTransfer = 1;
    ResponseResult transferMoney(TransferUnit transferUnit);
    ResponseResult commonTransferMoney(String verifyCode,TransferUnit transferUnit);

}
