package com.liaoyun.service.impl;

import com.liaoyun.domain.AccountUserInfo;
import com.liaoyun.domain.RegisterInfo;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 注册服务类
 */
@Service
@Transactional
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public ResponseResult register(RegisterInfo registerInfo) {
        //TODO 短信验证码校验

        //验证码校验通过，进行注册
        userMapper.inserterUserInfo(registerInfo.getAccountUserInfo());
        userMapper.insertUserPassword(registerInfo.getAccountUserPassword());
        return new ResponseResult<>(200,"账户创建成功");
    }
}
