package com.liaoyun.service;

import com.liaoyun.domain.BankCardInfo;

public interface CheckBankCardService {
    BankCardInfo checkCardNumberAndPassword(String cardNumber, String password);
}
