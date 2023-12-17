package com.liaoyun.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.*;
import com.liaoyun.domain.dataBaseType.BankCardInfo;
import com.liaoyun.domain.dataBaseType.CustomerInfo;
import com.liaoyun.domain.requestType.TransferRecordQueryConditions;
import com.liaoyun.domain.responseType.BankCardIdNumBalanceActive;
import com.liaoyun.domain.responseType.SimpleTransferTransaction;
import com.liaoyun.domain.responseType.TransactionRecordDetails;
import com.liaoyun.mapper.BankCardMapper;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.QueryInfoService;
import com.liaoyun.utils.HiddenCardNumber;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.*;

@Service
public class QueryInfoServiceImpl implements QueryInfoService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    BankCardMapper bankCardMapper;

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


    @Override
    public ResponseResult queryPersonalInformation(int customerId) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        CustomerInfo customerInfo = userMapper.selectCustomerInfo(customerId);
        Map<String, String> map = BeanUtils.describe(customerInfo);
        return new ResponseResult<>(200,"查询成功",map);
    }



    @Override
    public ResponseResult queryTransferRecord(int customerId, TransferRecordQueryConditions queryConditions, int pageNum, int pageSize) {

        List<Integer> idList = userMapper.selectCardId(customerId, queryConditions.getCardId());
        PageHelper.startPage(pageNum,pageSize);
        List<SimpleTransferTransaction> simpleTransferTransactionList = userMapper.selectTransferRecordPages(queryConditions,idList,customerId);
        if(simpleTransferTransactionList.size() == 0 || simpleTransferTransactionList == null){
            return new ResponseResult(1,"暂无数据");
        }
        simpleTransferTransactionList.forEach(simple->{simple.setPayerCardNumber(
                simple.getPayerCardNumber().substring(simple.getPayerCardNumber().length() - 4));
                if(simple.getStatus() == (byte) 1){
                    simple.setStatusComments("交易成功");
                }else {
                    simple.setStatusComments("交易失败");
                }
        });
        PageInfo pageInfo = new PageInfo(simpleTransferTransactionList);
        Pages pages = new Pages<>(pageInfo.getPageNum(),pageInfo.getSize(),pageInfo.getTotal(),pageInfo.getPages(),simpleTransferTransactionList);
        return new ResponseResult<>(200,"查出来的捏",pages);
    }

    @Override
    @InvokeVerifyCode
    public ResponseResult queryCardNumberByCardId(String verifyCode, int cardId) {
        String cardNumber = userMapper.selectCardNumberByCardId(cardId);
        return new ResponseResult(200,"查询银行卡成功",cardNumber);
    }

    @Override
    public ResponseResult queryTransactionDetails(int transactionId,int customerId) {
        TransactionRecordDetails transferTransaction = userMapper.selectTransactionDetails(transactionId);
        //防止查询非自身的交易记录,错误的交易号会得出非自身的cardId
        List<Integer> integers = userMapper.selectCardId(customerId, transferTransaction.getSenderCardId());
        if(integers.size() == 0){
            //TODO 记录用户非法操作次数，达到上限冻结账号
            return new ResponseResult<>(500,"非法查询");
        }
        return new ResponseResult<>(200,"查询成功",transferTransaction);
    }
}
