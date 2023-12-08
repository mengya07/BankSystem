package com.liaoyun.service;


import com.liaoyun.domain.ResponseResult;

import java.math.BigDecimal;

public interface TransferMoneyService {

    ResponseResult transferMoney(int CustomerId, String payerCardNumber, String payeeName, String payeeCardNumber, BigDecimal transferAmount);
}
