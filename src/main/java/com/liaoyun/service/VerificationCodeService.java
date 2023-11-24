package com.liaoyun.service;

import com.liaoyun.domain.ResponseResult;

public interface VerificationCodeService {
    ResponseResult sendCode(String phoneNumber);
}
