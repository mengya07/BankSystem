package com.liaoyun.service;

import com.liaoyun.domain.ResponseResult;

public interface EditAppInfoService {
    ResponseResult EditAppPassword(String verifyCode,String oldPassword, String newPassword,int userId);
    //手机号+短信验证码（相当于登录）
    //银行卡号
    //证件类型
    //证件号码
    //取款密码
    //取款密码验证通过后颁发token，跳转到修改密码服务（这个修改密码服务即便登录一般用户也不能随便访问）
    //新密码
    //确认密码
}
