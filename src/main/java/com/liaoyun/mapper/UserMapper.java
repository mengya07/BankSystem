package com.liaoyun.mapper;

import com.liaoyun.domain.AccountUserInfo;
import com.liaoyun.domain.AccountUserPassword;
import com.liaoyun.domain.User;
import com.liaoyun.domain.loginUser;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;


@Mapper
@Repository
public interface UserMapper {

    loginUser login(loginUser user);

    //根据用户名查询用户密码
    AccountUserPassword selectOne(String userName);

    //根据用户ID查询用户权限

    String selectPermissionsById(int userId);

    void insertUserPassword(AccountUserPassword accountUserPassword);

    void inserterUserInfo(AccountUserInfo accountUserInfo);
}
