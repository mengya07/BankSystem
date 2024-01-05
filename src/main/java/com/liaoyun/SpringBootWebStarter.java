package com.liaoyun;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Time;
import java.time.ZoneId;
import java.util.TimeZone;

@SpringBootApplication
public class SpringBootWebStarter {
    public static void main(String[] args){
        SpringApplication.run(com.liaoyun.SpringBootWebStarter.class,args);
    }
}
