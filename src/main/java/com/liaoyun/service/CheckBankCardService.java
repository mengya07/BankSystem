package com.liaoyun.service;

import com.liaoyun.domain.dataBaseType.BankCardInfo;

public interface CheckBankCardService {
    BankCardInfo checkCardNumberAndPassword(String cardNumber, String password);
}
