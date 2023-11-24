package com.liaoyun.utils;

import com.liaoyun.domain.AccountUserInfo;
import com.liaoyun.domain.RegisterInfo;
import com.liaoyun.domain.ResponseResult;

/**
 * 检查用户提交的注册信息是否规范的工具类
 * @author 潘明
 * @version 1.0
 *
 */
public class InfoInspecter {
    //检验手机号格式是否正确
    public static boolean checkPhoneNumber(String phoneNumber){
        return true;
    }
    //检验身份证号格式是否正确
    public static boolean checkIdentityCard(String IdentityCard){
        return true;
    }
    //检验密码格式是否正确
    public static boolean checkPassword(String password){
        return true;
    }

    public static ResponseResult checkInfo(RegisterInfo UserInfo){
        if(!checkPhoneNumber(UserInfo.getAccountUserInfo().getPhoneNumber())){
            return new ResponseResult<>(412,"电话号码格式错误");
        }else if(!checkIdentityCard(UserInfo.getAccountUserInfo().getIdentityCard())){
            return new ResponseResult<>(412,"身份证格式错误");
        }else if(!checkPassword(UserInfo.getAccountUserPassword().getPassword())){
            return new ResponseResult<>(412,"密码格式错误");
        }
        return null;
    }
}
