package com.liaoyun.service.impl;

import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.BankCardInfo;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.TransferTransaction;
import com.liaoyun.domain.TransferUnit;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.TransferMoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
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


    private ResponseResult transfer(BankCardInfo payerBankCardInfo,BankCardInfo payeeBankCardInfo,TransferUnit transferUnit,String postscript){
        //TODO 限额处理
        if(transferUnit.getTransferAmount().compareTo(new BigDecimal(10000))<0){
            //转账金额小于一万
            BigDecimal newBalance = payerBankCardInfo.getBalance().subtract(transferUnit.getTransferAmount()).add(new BigDecimal(5));
            //修改付款人余额
            userMapper.updateBankCardBalance(payerBankCardInfo.getCardId(), newBalance);
            newBalance = payeeBankCardInfo.getBalance().add(transferUnit.getTransferAmount());
            //修改收款人余额
            userMapper.updateBankCardBalance(payeeBankCardInfo.getCardId(),newBalance);
            TransactionRecording(payerBankCardInfo,payeeBankCardInfo,transferUnit,(byte)1);
            return new ResponseResult<>(200,"转账成功");
        }else if(transferUnit.getTransferAmount().compareTo(new BigDecimal(100000))<0){
            //转账金额大于一万小于十万
            BigDecimal newBalance = payerBankCardInfo.getBalance().subtract(transferUnit.getTransferAmount().add(new BigDecimal(10)));
            //修改付款人余额
            userMapper.updateBankCardBalance(payerBankCardInfo.getCardId(), newBalance);
            newBalance = payeeBankCardInfo.getBalance().add(transferUnit.getTransferAmount());
            //修改收款人余额
            userMapper.updateBankCardBalance(payeeBankCardInfo.getCardId(),newBalance);
            TransactionRecording(payerBankCardInfo,payeeBankCardInfo,transferUnit,(byte)1);
            return new ResponseResult<>(200,"转账成功");
        }
        return new ResponseResult(4,"转账金额超限");
    }

    private void TransactionRecording(BankCardInfo payerBankCardInfo, BankCardInfo payeeBankCardInfo,TransferUnit transferUnit,byte status){
        TransferTransaction transferTransaction = new TransferTransaction(
                payerBankCardInfo.getCardId(), payerBankCardInfo.getCardNumber(), payeeBankCardInfo.getCardId(),
                payeeBankCardInfo.getCardNumber(),transferUnit.getPayeeName() ,transferUnit.getTransferAmount(), new Timestamp(System.currentTimeMillis()), status,transferUnit.getPostscript());
        if(userMapper.insertTransferTransaction(transferTransaction) != 1){
            //TODO 抛出错误  记录日志
        }
    }
    @Override
    @InvokeVerifyCode
    public ResponseResult transferMoney(String verifyCode,TransferUnit transferUnit) {
        //查询付款人余额和
        BankCardInfo payerBankCardInfo = userMapper.selectCardInfoByCardNumber(transferUnit.getPayerCardNumber());
        if(payerBankCardInfo.getBalance().compareTo(transferUnit.getTransferAmount())<0){
            return new ResponseResult<>(1,"余额不足");
        }
        //根据卡号把收款人银行卡信息查出来
        BankCardInfo payeeBankCardInfo = userMapper.selectCardInfoByCardNumber(transferUnit.getPayeeCardNumber());
        if(Objects.isNull(payeeBankCardInfo)){
            //没有相关记录，银行卡和姓名不匹配
            payeeBankCardInfo = new BankCardInfo(0,transferUnit.getPayeeCardNumber());
            TransactionRecording(payerBankCardInfo,payeeBankCardInfo,transferUnit,(byte)0);
            return new ResponseResult(2,"收款账户不存在");
        }
        if(payeeBankCardInfo.getIsActive() == 0){
            //卡已停用
            payeeBankCardInfo = new BankCardInfo(0,transferUnit.getPayeeCardNumber());
            TransactionRecording(payerBankCardInfo,payeeBankCardInfo,transferUnit,(byte)0);
            return  new ResponseResult(3,"收款方银行卡已停用");
        }
        return transfer(payerBankCardInfo, payeeBankCardInfo,transferUnit,transferUnit.getPostscript());
    }
}
