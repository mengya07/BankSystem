package com.liaoyun;

import com.liaoyun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootWebStarter {

    @Autowired
    private UserService userService;

    public static void main(String[] args){
        SpringApplication.run(com.liaoyun.SpringBootWebStarter.class,args);
    }
}
