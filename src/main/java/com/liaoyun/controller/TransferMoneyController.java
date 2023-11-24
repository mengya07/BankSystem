package com.liaoyun.controller;

import com.liaoyun.domain.ResponseResult;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransferMoneyController {
    public ResponseResult  TransferMoney(){
        return new ResponseResult();
    }
}
