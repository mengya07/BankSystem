package com.liaoyun.service;

import com.liaoyun.domain.*;
import com.liaoyun.domain.dataBaseType.CustomerInfo;

public interface RegisterService {
    ResponseResult register(String verifyCode,String phoneNumber);

    ResponseResult identityVerification(RealNameAuthentication realNameAuthentication, Integer userId);

    ResponseResult bindBankCard(String verifyCode,String phoneNumber,int userId);

    ResponseResult verifyCardAndIdentity(AddBankCardInfo addBankCardInfo,int userId);

    ResponseResult addBankCard(AddBankCardInfo cardNumberAndPassword, int customerId);

    ResponseResult addBankCardVerify(String verifyCode, String phoneNumber, Integer customerId);

    ResponseResult updateCustomerInfo(String verifyCode,CustomerInfo customerInfo,Integer customerId);
}
