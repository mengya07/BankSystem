package com.liaoyun.service;


import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.TransferUnit;

import java.math.BigDecimal;

public interface TransferMoneyService {

    ResponseResult transferMoney(String verifyCode,TransferUnit transferUnit);
}
