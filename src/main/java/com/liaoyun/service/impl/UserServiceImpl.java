package com.liaoyun.service.impl;

import com.liaoyun.domain.User;
import com.liaoyun.domain.loginUser;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void insert(User user) {
        userMapper.insert(user);
    }

    @Override
    public loginUser login(loginUser user) {
        loginUser luser = userMapper.login(user);
        return luser;
    }

    @Override
    public List<User> findAll() {
        return userMapper.findAll();
    }
}
