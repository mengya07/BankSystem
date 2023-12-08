package com.liaoyun.service.impl;

import com.liaoyun.domain.BankCardInfo;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.TransferMoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Objects;

@Transactional
@Service
public class TransferMoneyServiceImpl implements TransferMoneyService {

    @Autowired
    UserMapper userMapper;
    /*
    code 1 余额不足
    code 2 收款账户不存在
    code 3 收款方银行卡已停用
     */
    @Override
    public ResponseResult transferMoney(int CustomerId, String payerCardNumber, String payeeName, String payeeCardNumber, BigDecimal transferAmount) {
        //查余额
        BigDecimal payerBalance = userMapper.selectBalanceByCardNumber(payeeCardNumber);
        if(payerBalance.compareTo(transferAmount)<0){
            return new ResponseResult<>(1,"余额不足");
        }
        //根据卡号把银行卡信息查出来
        BankCardInfo bankCardInfo = userMapper.selectCardInfoByCardNumber(payeeName,payeeCardNumber);
        if(Objects.isNull(bankCardInfo)){
            //没有相关记录，银行卡和姓名不匹配
            return new ResponseResult(2,"收款账户不存在");
        }
        if(bankCardInfo.getIsActive() == 0){
            //卡已停用
            return  new ResponseResult(3,"收款方银行卡已停用");
        }
        if(bankCardInfo.getBalance().compareTo(new BigDecimal(10000))<0){
            //转账金额小于一万
            transferAmount.add(new BigDecimal(5));
            userMapper.updateBankCardBalance(bankCardInfo.getCardNumber(), bankCardInfo.getBalance().divide(transferAmount));
        }else if(bankCardInfo.getBalance().compareTo(new BigDecimal(100000))<0){
            //转账金额大于一万小于十万
            transferAmount.add(new BigDecimal(10));
            userMapper.updateBankCardBalance(bankCardInfo.getCardNumber(), bankCardInfo.getBalance().divide(transferAmount));
        }
        return null;
    }
}
