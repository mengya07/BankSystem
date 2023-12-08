package com.liaoyun.service;

import com.liaoyun.domain.ResponseResult;

import java.lang.reflect.InvocationTargetException;

public interface QueryInfoService {
    ResponseResult queryBalance(int customerId);
    ResponseResult queryBankCards(int customerId);
    ResponseResult queryPersonalInformation(int customerId) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException;
}
