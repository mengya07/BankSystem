package com.liaoyun.service;

import com.liaoyun.domain.*;

public interface RegisterService {
    ResponseResult register(String verifyCode,String phoneNumber);

    ResponseResult identityVerification(RealNameAuthentication realNameAuthentication, int userId);

//    ResponseResult bindBankCard(String verifyCode,String phoneNumber,RealNameAuthentication realNameAuthentication,int userId);

    ResponseResult verifyCardAndIdentity(String verifyCode,String phoneNumber,AddBankCardInfo addBankCardInfo,int userId);

    ResponseResult addBankCard(String verifyCode, String phoneNumber, AddBankCardInfo cardNumberAndPassword, int customerId);


}
