package com.liaoyun.service;

import com.liaoyun.domain.AccountUserPassword;
import com.liaoyun.domain.ResponseResult;

public interface LoginService {

    ResponseResult login(AccountUserPassword user);

    ResponseResult logout();
}
