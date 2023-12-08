package com.liaoyun.service;

import com.liaoyun.domain.RegisterInfo;
import com.liaoyun.domain.ResponseResult;

public interface RegisterService {
    ResponseResult register(RegisterInfo registerInfo);
}
