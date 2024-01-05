package com.liaoyun.service.impl;

import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.dataBaseType.BankCardInfo;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.dataBaseType.TransferTransaction;
import com.liaoyun.domain.TransferUnit;
import com.liaoyun.domain.responseType.TransferResult;
import com.liaoyun.mapper.BankCardMapper;
import com.liaoyun.mapper.RiskControlMapper;
import com.liaoyun.mapper.TransactionRecordMapper;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.TransferMoneyService;
import com.liaoyun.utils.SnowflakeIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Objects;


@Service
public class TransferMoneyServiceImpl implements TransferMoneyService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    BankCardMapper bankCardMapper;

    @Autowired
    RiskControlMapper riskControlMapper;

    @Autowired
    TransactionRecordMapper transactionRecordMapper;

    @Autowired
    SnowflakeIdGenerator snowflakeIdGenerator;
    /*
    code 1 余额不足
    code 2 收款账户不存在
    code 3 收款方银行卡已停用
    code 4 转账金额超限
     */
    private BigDecimal maxAmount = new BigDecimal(100000);
    private BigDecimal lessThanOneTenThousandFee = new BigDecimal(5);
    private BigDecimal tenThousandToOneHundredThousandFee = new BigDecimal(10);
    @Transactional
    public ResponseResult updateBalance(BankCardInfo payerBankCardInfo, BankCardInfo payeeBankCardInfo, TransferUnit transferUnit,BigDecimal fee){
        //转账金额小于一万
        BigDecimal newBalance = payerBankCardInfo.getBalance().subtract(transferUnit.getAmount().add(fee));
        int record = 0;
        //修改付款人余额
        record = record + bankCardMapper.updateBankCardBalance(payerBankCardInfo.getCardId(), newBalance);
        payerBankCardInfo.setBalance(newBalance);
        newBalance = payeeBankCardInfo.getBalance().add(transferUnit.getAmount());
        //修改收款人余额
        record = record + bankCardMapper.updateBankCardBalance(payeeBankCardInfo.getCardId(),newBalance);
        payeeBankCardInfo.setBalance(newBalance);
        //写入转账记录
        if(record != 2){
            throw new RuntimeException("系统错误,请重试");
        }
        //记录交易信息
        return TransactionRecording(payerBankCardInfo,payeeBankCardInfo,transferUnit,(byte)1);
    }
    private ResponseResult transfer(BankCardInfo payerBankCardInfo,BankCardInfo payeeBankCardInfo,TransferUnit transferUnit,String postscript){
        //TODO 限额处理
        //手机交易码单日单笔转账上限十万
        BigDecimal restAmount = riskControlMapper.selectAmountDailyLimit(payerBankCardInfo.getCustomerId());
        if(transferUnit.getAmount().compareTo(maxAmount) > 0 || transferUnit.getAmount().compareTo(restAmount) > 0 ){
            TransactionRecording(payerBankCardInfo,payeeBankCardInfo,transferUnit,(byte)3);
            return new ResponseResult<>(3,"转账金额已达上限");
        }else if(transferUnit.getAmount().compareTo(lessThanOneTenThousandFee)<0){
            return updateBalance( payerBankCardInfo, payeeBankCardInfo, transferUnit,lessThanOneTenThousandFee);
        }else{
            return updateBalance( payerBankCardInfo, payeeBankCardInfo, transferUnit,tenThousandToOneHundredThousandFee);
        }
    }

    private ResponseResult TransactionRecording(BankCardInfo payerBankCardInfo, BankCardInfo payeeBankCardInfo,TransferUnit transferUnit,byte status){
        //TODO 生成交易序列
        Long transactionId = snowflakeIdGenerator.generateId();
        long adjustedTimeMillis = System.currentTimeMillis();
        long eightHoursInMillis = 8 * 60 * 60 * 1000;
        adjustedTimeMillis = adjustedTimeMillis + eightHoursInMillis;
        Timestamp timestamp = new Timestamp(adjustedTimeMillis);
        //查询更新后的余额
        TransferTransaction transferTransaction = new TransferTransaction(transactionId,payerBankCardInfo.getCustomerId(),
                payerBankCardInfo.getCardId(), payerBankCardInfo.getCardNumber(), payerBankCardInfo.getBalance(),payerBankCardInfo.getCardHolderName(),
                payeeBankCardInfo.getCustomerId(), payeeBankCardInfo.getCardId(), payeeBankCardInfo.getCardNumber(), payeeBankCardInfo.getBalance(),payeeBankCardInfo.getCardHolderName(),
                transferUnit.getAmount(), timestamp, status,transferUnit.getPostscript());
        if(transactionRecordMapper.insertTransferTransaction(transferTransaction) != 1){
            //TODO 抛出错误  记录日志
        }


        TransferResult transferResult = new TransferResult(transactionId.toString(),timestamp,payerBankCardInfo.getBalance());
        return new ResponseResult(200,"转账成功",transferResult);
    }



    /**
     * 转账函数
     * 伪造customerId和cardId
     * customerId是绝对不能让传输的
     * @param
     * @param transferUnit
     * @return
     */
    @Override
    public ResponseResult transferMoney( TransferUnit transferUnit) {
        //查询付款人余额
        BankCardInfo payerBankCardInfo = bankCardMapper.selectSingleBankCard(transferUnit.getSenderCustomerId(),
                transferUnit.getSenderCardId());

        if(payerBankCardInfo.getCardNumber().equals(transferUnit.getReceiverCardNumber())){
            return new ResponseResult<>(233,"不能给自己转账");
        }
        if(Objects.isNull(payerBankCardInfo)){
            //TODO 记录日志 高危操作
            throw new RuntimeException("系统错误");
        }
        if(payerBankCardInfo.getBalance().compareTo(transferUnit.getAmount())<0){
            return new ResponseResult<>(1,"余额不足");
        }
        //根据姓名和卡号把收款人银行卡信息查出来
        BankCardInfo payeeBankCardInfo = bankCardMapper.selectCardInfoByCardNumber(transferUnit.getReceiverName(),transferUnit.getReceiverCardNumber());
        if(Objects.isNull(payeeBankCardInfo)){
            //没有相关记录，银行卡和姓名不匹配
            payeeBankCardInfo = new BankCardInfo(transferUnit.getReceiverCardNumber(),transferUnit.getReceiverName());
            TransactionRecording(payerBankCardInfo,payeeBankCardInfo,transferUnit,(byte)2);
            return new ResponseResult(2,"收款账户不存在");
        }
//        if(payeeBankCardInfo.getIsActive() == 0){
//            //卡已停用
//            payeeBankCardInfo = new BankCardInfo(0,transferUnit.getReceiverCardNumber());
//            TransactionRecording(payerBankCardInfo,payeeBankCardInfo,transferUnit,(byte)0);
//            return  new ResponseResult(3,"收款方银行卡已停用");
//        }
        return transfer(payerBankCardInfo, payeeBankCardInfo,transferUnit,transferUnit.getPostscript());
    }


    @Override
    @InvokeVerifyCode
    public ResponseResult commonTransferMoney(String verifyCode,TransferUnit transferUnit) {
        return transferMoney(transferUnit);
    }


}
