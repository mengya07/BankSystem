package com.liaoyun.service.impl;

import com.liaoyun.domain.BankCardInfo;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.TransferUnit;
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
    code 4 转账金额超限
     */


    ResponseResult transfer(TransferUnit transferUnit,BigDecimal payerBalance,BankCardInfo bankCardInfo){
        if(transferUnit.getTransferAmount().compareTo(new BigDecimal(10000))<0){
            //转账金额小于一万
            BigDecimal newBalance = payerBalance.subtract(transferUnit.getTransferAmount().add(new BigDecimal(5)));
            //修改付款人余额
            userMapper.updateBankCardBalance(transferUnit.getPayerCardNumber(), newBalance);
            newBalance = bankCardInfo.getBalance().add(transferUnit.getTransferAmount());
            //修改收款人余额
            userMapper.updateBankCardBalance(bankCardInfo.getCardNumber(),newBalance);
            return new ResponseResult<>(200,"转账成功");
        }else if(transferUnit.getTransferAmount().compareTo(new BigDecimal(100000))<0){
            //转账金额大于一万小于十万
            BigDecimal newBalance = payerBalance.subtract(transferUnit.getTransferAmount().add(new BigDecimal(10)));
            //修改付款人余额
            userMapper.updateBankCardBalance(transferUnit.getPayerCardNumber(), newBalance);
            newBalance = bankCardInfo.getBalance().add(transferUnit.getTransferAmount());
            //修改收款人余额
            userMapper.updateBankCardBalance(bankCardInfo.getCardNumber(),newBalance);
            return new ResponseResult<>(200,"转账成功");
        }
        return new ResponseResult(4,"转账金额超限");
    }

    @Override
    public ResponseResult transferMoney(TransferUnit transferUnit) {
        //付款人查余额
        BigDecimal payerBalance = (userMapper.selectBalanceByCustomerId(transferUnit.getCustomerId())).getBalance();
        if(payerBalance.compareTo(transferUnit.getTransferAmount())<0){
            return new ResponseResult<>(1,"余额不足");
        }
        //根据卡号把收款人银行卡信息查出来
        BankCardInfo bankCardInfo = userMapper.selectCardInfoByCardNumber(transferUnit.getPayeeName(),transferUnit.getPayeeCardNumber());
        if(Objects.isNull(bankCardInfo)){
            //没有相关记录，银行卡和姓名不匹配
            return new ResponseResult(2,"收款账户不存在");
        }
        if(bankCardInfo.getIsActive() == 0){
            //卡已停用
            return  new ResponseResult(3,"收款方银行卡已停用");
        }
        return transfer(transferUnit, payerBalance, bankCardInfo);
    }
}
