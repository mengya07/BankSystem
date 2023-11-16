package com.liaoyun.service;

import com.liaoyun.domain.User;
import com.liaoyun.domain.loginUser;

import java.util.List;

public interface UserService {


    List<User> findAll();

    loginUser login(loginUser user);

    void insert(User user);
}
