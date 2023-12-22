package com.liaoyun.service;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.requestType.TransferRecordQueryConditions;

import java.lang.reflect.InvocationTargetException;

public interface QueryInfoService {
    ResponseResult querySingleBankCard(int customerId,int cardId) throws InvocationTargetException, IllegalAccessException;
    ResponseResult queryBankCards(int customerId) throws InvocationTargetException, IllegalAccessException;
//    ResponseResult queryPersonalInformation(int customerId) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException;

    ResponseResult queryCardNumberByCardId(String verifyCode,Integer cardId);

    ResponseResult queryTransferRecordDetail(String transactionId,int customerId) throws InvocationTargetException, IllegalAccessException;

    ResponseResult queryTransferRecord(int customerId, TransferRecordQueryConditions queryConditions, int pageNum, int pageSize);

    ResponseResult queryTransactionRecord(int customerId,TransferRecordQueryConditions queryConditions,int pageNum,int pageSize);
    ResponseResult queryTransactionRecordDetail(String transactionId,int customerId);

    ResponseResult queryCustomerInfo(Integer customerId);

    ResponseResult queryMonthlyCheck(Integer customerId);
}
