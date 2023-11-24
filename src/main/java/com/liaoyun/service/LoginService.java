package com.liaoyun.service;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.User;
import org.springframework.stereotype.Service;

public interface LoginService {

    ResponseResult login(User user);

    ResponseResult logout();
}
