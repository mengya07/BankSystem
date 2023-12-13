package com.liaoyun.service;

import com.liaoyun.domain.ResponseResult;

public interface SendSmsService {
    ResponseResult sendSms(String phoneNumber) throws Exception;
}
