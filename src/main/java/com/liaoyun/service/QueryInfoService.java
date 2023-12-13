package com.liaoyun.service;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.TransferRecordQueryConditions;

import java.lang.reflect.InvocationTargetException;

public interface QueryInfoService {
    ResponseResult queryBalance(int customerId);
    ResponseResult queryBankCards(int customerId);
    ResponseResult queryPersonalInformation(int customerId) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException;

    ResponseResult queryTransferRecord(int customerId, TransferRecordQueryConditions queryConditions, int pageNum, int pageSize);

    ResponseResult queryCardNumberByCardId(String verifyCode,int cardId);
}
