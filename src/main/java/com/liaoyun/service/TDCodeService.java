package com.liaoyun.service;

import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.requestType.AmountAndPassword;

public interface TDCodeService {
    ResponseResult GenerateTDCode(Integer userId,Integer customerId, Integer cardId);

    ResponseResult VerifyTDCode(String orderId);


    ResponseResult TDCodeTransferMoney(AmountAndPassword amountAndPassword, Integer customerId, Integer userId);
}
