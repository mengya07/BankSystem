package com.liaoyun.service.impl;

import com.liaoyun.domain.AccountUserPassword;
import com.liaoyun.domain.LoginUserDetail;
import com.liaoyun.domain.User;
import com.liaoyun.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceDetailImpl implements UserDetailsService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AccountUserPassword user = userMapper.selectOne(username);
        if(Objects.isNull(user)){
            throw new RuntimeException("用户名或密码错误");
        }else{
            //查询权限信息
            String permissions = userMapper.selectPermissionsById(user.getId());
            List<String> list = new ArrayList<>(Arrays.asList(permissions));

            //封装成UserDetails
            return new LoginUserDetail(user,list);
        }
    }
}
