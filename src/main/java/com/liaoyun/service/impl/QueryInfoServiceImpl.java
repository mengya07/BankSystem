package com.liaoyun.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.*;
import com.liaoyun.domain.dataBaseType.BankCardInfo;
import com.liaoyun.domain.dataBaseType.CustomerInfo;
import com.liaoyun.domain.requestType.TransferRecordQueryConditions;
import com.liaoyun.domain.responseType.*;
import com.liaoyun.mapper.BankCardMapper;
import com.liaoyun.mapper.CustomerInfoMapper;
import com.liaoyun.mapper.TransactionRecordMapper;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.QueryInfoService;
import com.liaoyun.utils.HiddenCardNumber;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.util.*;

@Service
public class QueryInfoServiceImpl implements QueryInfoService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    BankCardMapper bankCardMapper;

    @Autowired
    TransactionRecordMapper transactionRecordMapper;

    @Autowired
    CustomerInfoMapper customerInfoMapper;

    @Override
    public ResponseResult querySingleBankCard(int customerId,int cardId) throws InvocationTargetException, IllegalAccessException {
        //需要customerId,防止伪造数据查询非自身卡信息
        BankCardInfo bankCardInfo = bankCardMapper.selectSingleBankCard(customerId,cardId);
        if(!Objects.isNull(bankCardInfo)){
            //返回银行卡号和对应余额信息
            String hiddenNumber = HiddenCardNumber.HiddenNumber(bankCardInfo.getCardNumber());
            bankCardInfo.setCardNumber(hiddenNumber);
            BankCardIdNumBalanceActive cardNumberAndBalance = new BankCardIdNumBalanceActive();
            BeanUtils.copyProperties(cardNumberAndBalance,bankCardInfo);
            return new ResponseResult<>(200,"查询成功",cardNumberAndBalance);
        }
        return new ResponseResult<>(400,"查询失败");
    }
    @Override
    public ResponseResult queryBankCards(int customerId) throws InvocationTargetException, IllegalAccessException {
        List<BankCardInfo> bankCardInfos = bankCardMapper.selectBankCards(customerId);
        List<BankCardIdNumBalanceActive> bankCardIdNumBalanceActives = new ArrayList<>();
        if(bankCardInfos.size() == 0 || bankCardInfos == null){
            return new ResponseResult(400,"查询失败");
        }
        for (BankCardInfo bankCardInfo: bankCardInfos ){
            //TODO 做跨行得获取银行卡对应的银行信息，还有一些银行卡信息（一类二类卡，是否激活，启用）
            //获取该用户所有银行卡号
            String cardNumber = bankCardInfo.getCardNumber();
            //给银行卡加密一下
            cardNumber = HiddenCardNumber.HiddenNumber(cardNumber);
            bankCardInfo.setCardNumber(cardNumber);
            BankCardIdNumBalanceActive bankCardIdNumBalanceActive = new BankCardIdNumBalanceActive();
            BeanUtils.copyProperties(bankCardIdNumBalanceActive,bankCardInfo);
            bankCardIdNumBalanceActives.add(bankCardIdNumBalanceActive);
        }

        //返回银行卡全部非加密信息
        return new ResponseResult<>(200,"查询成功",bankCardIdNumBalanceActives);
    }


//    @Override
//    public ResponseResult queryPersonalInformation(int customerId) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
//        CustomerInfo customerInfo = userMapper.selectCustomerInfo(customerId);
//        Map<String, String> map = BeanUtils.describe(customerInfo);
//        return new ResponseResult<>(200,"查询成功",map);
//    }



    @Override
    public ResponseResult queryTransferRecord(int customerId, TransferRecordQueryConditions queryConditions, int pageNum, int pageSize) {

        List<Integer> idList = bankCardMapper.selectCardId(customerId, queryConditions.getCardId());
        if(idList.size() == 0){
            //TODO 记录日志
            throw new RuntimeException("系统错误");
        }
        PageHelper.startPage(pageNum,pageSize);
        List<SimpleTransferRecord> simpleTransferRecordList
                = transactionRecordMapper.selectTransferRecordPages(queryConditions,idList,customerId);
        if(simpleTransferRecordList == null || simpleTransferRecordList.size() == 0 ){
            return new ResponseResult(400,"暂无数据");
        }
//        simpleTransferTransactionList.forEach(simple->{simple.setPayerCardNumber(
//                simple.getPayerCardNumber().substring(simple.getPayerCardNumber().length() - 4));
//                if(simple.getStatus() == (byte) 1){
//                    simple.setStatusComments("交易成功");
//                }else {
//                    simple.setStatusComments("交易失败");
//                }
//        });
        PageInfo pageInfo = new PageInfo(simpleTransferRecordList);
        Pages pages = new Pages<>(pageInfo.getPageNum(),pageInfo.getSize(),pageInfo.getTotal(),pageInfo.getPages(), simpleTransferRecordList);
        return new ResponseResult<>(200,"查出来的捏",pages);
    }

    @Override
    public ResponseResult queryTransactionRecord(int customerId,TransferRecordQueryConditions queryConditions,int pageNum,int pageSize) {
        List<Integer> idList = bankCardMapper.selectCardId(customerId, queryConditions.getCardId());
        if(idList.size() == 0){
            //TODO 记录日志
            return new ResponseResult<>(200,"暂无数据");
        }
        PageHelper.startPage(pageNum,pageSize);
        List<SimpleTransactionRecord> simpleTransactionRecords = transactionRecordMapper.selectTransactionRecordPages(queryConditions, customerId);
        PageInfo pageInfo = new PageInfo(simpleTransactionRecords);
        Pages pages = new Pages<>(pageInfo.getPageNum(),pageInfo.getSize(),pageInfo.getTotal(),pageInfo.getPages(), simpleTransactionRecords);
        return new ResponseResult<>(200,"简要交易记录",pages);
    }




    @Override
    @InvokeVerifyCode
    public ResponseResult queryCardNumberByCardId(String verifyCode, Integer cardId) {
        String cardNumber = bankCardMapper.selectCardNumberByCardId(cardId);
        if(Objects.isNull(cardNumber)){
            throw new RuntimeException("系统错误");
        }
        return new ResponseResult(200,"查询银行卡成功",cardNumber);
    }

    @Override
    public ResponseResult queryTransferRecordDetail(String transactionId,int customerId) throws InvocationTargetException, IllegalAccessException {
        TransferRecordDetails transferRecordDetails = transactionRecordMapper.selectTransferDetails(customerId,Long.parseLong(transactionId));
        if(Objects.isNull(transferRecordDetails)){
            return new ResponseResult<>(400,"暂无数据");
        }
        return new ResponseResult<>(200,"查询成功", transferRecordDetails);
    }

    @Override
    public ResponseResult queryTransactionRecordDetail(String transactionId, int customerId) {
        TransactionRecordDetails transferRecordDetails = transactionRecordMapper.selectTransactionDetails(customerId,Long.parseLong(transactionId));
        if(Objects.isNull(transferRecordDetails)){
            //非法的查询
            return new ResponseResult<>(300,"非法，查询非本账号记录");
        }
        return new ResponseResult<>(200,"查询成功", transferRecordDetails);
    }

    @Override
    public ResponseResult queryCustomerInfo(Integer customerId) {
        CustomerInfo customerInfo = customerInfoMapper.selectCustomerInfo(customerId);
        return new ResponseResult<>(200,"查询成功",customerInfo);
    }

    @Override
    public ResponseResult queryMonthlyCheck(Integer customerId) {
        List<MonthlyCheck> monthlyChecks = transactionRecordMapper.selectMonthlyCheck(customerId);
        if(monthlyChecks.size() == 0){
            return new ResponseResult<>(400,"暂无数据");
        }
        return new ResponseResult<>(200,"阅读账单查询成功",monthlyChecks);
    }
}
