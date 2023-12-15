package com.liaoyun.service.impl;

import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.dataBaseType.BankCardInfo;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.dataBaseType.TransferTransaction;
import com.liaoyun.domain.TransferUnit;
import com.liaoyun.mapper.BankCardMapper;
import com.liaoyun.mapper.RiskControlMapper;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.TransferMoneyService;
import com.liaoyun.utils.SnowflakeIdGenerator;
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

    @Autowired
    BankCardMapper bankCardMapper;

    @Autowired
    RiskControlMapper riskControlMapper;

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

    private ResponseResult updateBalance(BankCardInfo payerBankCardInfo, BankCardInfo payeeBankCardInfo, TransferUnit transferUnit,BigDecimal fee){
        //转账金额小于一万
        BigDecimal newBalance = payerBankCardInfo.getBalance().subtract(transferUnit.getAmount()).add(fee);
        //修改付款人余额
        userMapper.updateBankCardBalance(payerBankCardInfo.getCardId(), newBalance);
        newBalance = payeeBankCardInfo.getBalance().add(transferUnit.getAmount());
        //修改收款人余额
        userMapper.updateBankCardBalance(payeeBankCardInfo.getCardId(),newBalance);
        //写入转账记录
        TransactionRecording(payerBankCardInfo,payeeBankCardInfo,transferUnit,(byte)1);
        return new ResponseResult(200,"转账成功");
    }
    private ResponseResult transfer(BankCardInfo payerBankCardInfo,BankCardInfo payeeBankCardInfo,TransferUnit transferUnit,String postscript){
        //TODO 限额处理
        //手机交易码单日单笔转账上限十万
        BigDecimal restAmount = riskControlMapper.selectAmountDailyLimit(payerBankCardInfo.getCustomerId());
        if(transferUnit.getAmount().compareTo(maxAmount) > 0 || transferUnit.getAmount().compareTo(restAmount) > 0 ){
            return new ResponseResult<>(1,"转账金额已达上限");
        }else if(transferUnit.getAmount().compareTo(lessThanOneTenThousandFee)<0){
            return updateBalance( payerBankCardInfo, payeeBankCardInfo, transferUnit,lessThanOneTenThousandFee);
        }else{
            return updateBalance( payerBankCardInfo, payeeBankCardInfo, transferUnit,tenThousandToOneHundredThousandFee);
        }
        //查询限额额度,计算手续费
    }

    private void TransactionRecording(BankCardInfo payerBankCardInfo, BankCardInfo payeeBankCardInfo,TransferUnit transferUnit,byte status){
        //TODO 生成交易序列
        long transactionId = snowflakeIdGenerator.generateId();
        TransferTransaction transferTransaction = new TransferTransaction(transactionId,transferUnit.getSenderCustomerId(),
                payerBankCardInfo.getCardId(), payerBankCardInfo.getCardNumber(), payeeBankCardInfo.getCardId(),
                payeeBankCardInfo.getCardNumber(),transferUnit.getReceiverCardNumber() ,transferUnit.getAmount(), new Timestamp(System.currentTimeMillis()), status,transferUnit.getPostscript());
        if(userMapper.insertTransferTransaction(transferTransaction) != 1){
            //TODO 抛出错误  记录日志
        }
    }
    @Override
    @InvokeVerifyCode
    public ResponseResult transferMoney(String verifyCode,TransferUnit transferUnit) {
        //查询付款人余额
        BankCardInfo payerBankCardInfo = bankCardMapper.selectSingleBankCard(transferUnit.getSenderCustomerId(),
                transferUnit.getSenderCardId());
        if(payerBankCardInfo.getBalance().compareTo(transferUnit.getAmount())<0){
            return new ResponseResult<>(1,"余额不足");
        }
        //根据卡号把收款人银行卡信息查出来
        BankCardInfo payeeBankCardInfo = bankCardMapper.selectCardInfoByCardNumber(transferUnit.getReceiverCardNumber());
        if(Objects.isNull(payeeBankCardInfo)){
            //没有相关记录，银行卡和姓名不匹配
            payeeBankCardInfo = new BankCardInfo(0,transferUnit.getReceiverCardNumber());
            TransactionRecording(payerBankCardInfo,payeeBankCardInfo,transferUnit,(byte)0);
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
}
