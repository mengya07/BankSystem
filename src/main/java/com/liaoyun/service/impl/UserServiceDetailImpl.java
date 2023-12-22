package com.liaoyun.service.impl;

import com.liaoyun.domain.dataBaseType.AccountUserPassword;
import com.liaoyun.domain.LoginUserDetail;
import com.liaoyun.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
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
        //根据用户名把密码查出来，以便后续比对
        //TODO 应该可以改成用户ID？
        AccountUserPassword user = userMapper.selectOne(username);
        if(Objects.isNull(user)){
            throw new RuntimeException("用户名或密码错误");
        }else{
            //查询权限信息
            String permissions = userMapper.selectPermissionsById(user.getUserId());
            List<String> list = new ArrayList<>(Arrays.asList(permissions));
            //封装成UserDetails
            return new LoginUserDetail(user,list);
        }
    }
}
