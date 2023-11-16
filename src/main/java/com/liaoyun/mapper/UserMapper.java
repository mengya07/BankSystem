package com.liaoyun.mapper;

import com.liaoyun.domain.User;
import com.liaoyun.domain.loginUser;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;


@Mapper
@Repository
public interface UserMapper {
    List<User> findAll();

    loginUser login(loginUser user);

    void insert(User user);
}
