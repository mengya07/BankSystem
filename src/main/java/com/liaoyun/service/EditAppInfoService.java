package com.liaoyun.service;

import com.liaoyun.domain.ResponseResult;

public interface EditAppInfoService {
    ResponseResult EditAppPassword(String verifyCode,String oldPassword, String newPassword,int userId);

    ResponseResult setPaymentPassword(Integer userId, String paymentPassword);

    ResponseResult setLoginPassword(Integer userId, String loginPassword);
}
