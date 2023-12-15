package com.liaoyun.service.impl;

import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.dataBaseType.AccountUserPassword;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.EditAppInfoService;
import com.liaoyun.utils.InfoInspecter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class EditAppInfoServiceImpl implements EditAppInfoService {
    @Autowired
    UserMapper userMapper;
    @Override
    @InvokeVerifyCode
    public ResponseResult EditAppPassword(String verifyCode,String oldPassword, String newPassword,int userId) {
        //TODO 校验短信验证码

        AccountUserPassword accountUserPassword =  userMapper.selectPasswordByUserId(userId);
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if( !bCryptPasswordEncoder.matches(oldPassword,accountUserPassword.getPassword()) ){
            return new ResponseResult(1,"原密码错误");
        }
        //加密新密码存入数据库
        if( !InfoInspecter.checkPassword(newPassword) ){
            return new ResponseResult(2,"新密码格式错误，请重新输入");
        }
        String encodeNewPassword = bCryptPasswordEncoder.encode(newPassword);
        accountUserPassword.setPassword(encodeNewPassword);
        int result = userMapper.updateAppPassword(accountUserPassword);
        if(result == 1){
            return new ResponseResult<>(200,"密码修改成功，请下次登录时使用");
        }
        return new ResponseResult(3,"密码修改失败");
    }
}
