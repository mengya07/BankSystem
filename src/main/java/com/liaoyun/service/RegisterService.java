package com.liaoyun.service;

import com.liaoyun.domain.BankCardInfo;
import com.liaoyun.domain.CustomerInfo;
import com.liaoyun.domain.RegisterInfo;
import com.liaoyun.domain.ResponseResult;

public interface RegisterService {
    ResponseResult register(String verifyCode,String phoneNumber);

    ResponseResult identityVerification(CustomerInfo customerInfo);

    ResponseResult bindBankCard(BankCardInfo bankCardInfo);


}
