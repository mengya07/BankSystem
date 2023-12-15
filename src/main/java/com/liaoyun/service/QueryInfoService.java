package com.liaoyun.service;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.requestType.TransferRecordQueryConditions;

import java.lang.reflect.InvocationTargetException;

public interface QueryInfoService {
    ResponseResult querySingleBankCard(int customerId,int cardId) throws InvocationTargetException, IllegalAccessException;
    ResponseResult queryBankCards(int customerId) throws InvocationTargetException, IllegalAccessException;
    ResponseResult queryPersonalInformation(int customerId) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException;

    ResponseResult queryTransferRecord(int customerId, TransferRecordQueryConditions queryConditions, int pageNum, int pageSize);

    ResponseResult queryCardNumberByCardId(String verifyCode,int cardId);

    ResponseResult queryTransactionDetails(int transactionId,int customerId);
}
