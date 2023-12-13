package com.liaoyun.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liaoyun.aop.InvokeVerifyCode;
import com.liaoyun.domain.*;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.QueryInfoService;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QueryInfoServiceImpl implements QueryInfoService {

    @Autowired
    UserMapper userMapper;



    @Override
    public ResponseResult queryBalance(int customerId) {
        List<BankCardInfo> bankCardInfos = userMapper.selectBankCardsByCustomerId(customerId);
        Map<String, BigDecimal> map = new HashMap<>();
        for(BankCardInfo bankCardInfo: bankCardInfos){
            map.put(bankCardInfo.getCardNumber(),bankCardInfo.getBalance());
        }
        //返回银行卡号和对应余额信息
        return new ResponseResult<>(200,"查询成功",map);
    }
    @Override
    public ResponseResult queryBankCards(int customerId) {
        List<BankCardInfo> bankCardInfos = userMapper.selectBankCardsByCustomerId(customerId);
        List<BankCardInfo> bankCardList = new ArrayList<>();
        for (BankCardInfo bankCardInfo: bankCardInfos ){
            //TODO 做跨行得获取银行卡对应的银行信息，还有一些银行卡信息（一类二类卡，是否激活，启用）
            //获取该用户所有银行卡号
            String cardNumber = bankCardInfo.getCardNumber();
            //给银行卡加密一下
            // 获取字符串的前四位
            String firstFour = cardNumber.substring(0, 4);
            // 获取字符串的后四位
            String lastFour = cardNumber.substring(cardNumber.length() - 4);

            // 构造隐藏中间部分的字符串
            StringBuilder maskedMiddle = new StringBuilder();
            for (int i = 0; i < cardNumber.length() - 8; i++) {
                maskedMiddle.append("*");
            }
            // 组合隐藏后的字符串
            bankCardInfo.setCardNumber(firstFour + maskedMiddle + lastFour);
            bankCardList.add(bankCardInfo);
        }
        //返回银行卡全部非加密信息
        return new ResponseResult<>(200,"查询成功",bankCardList);
    }

    @Override
    public ResponseResult queryPersonalInformation(int customerId) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        CustomerInfo customerInfo = userMapper.selectCustomerInfo(customerId);
        Map<String, String> map = BeanUtils.describe(customerInfo);
        return new ResponseResult<>(200,"查询成功",map);
    }



    @Override
    public ResponseResult queryTransferRecord(int customerId,TransferRecordQueryConditions queryConditions,int pageNum,int pageSize) {

        List<Integer> idList = userMapper.selectCardId(customerId, queryConditions.getCardNumber());
        PageHelper.startPage(pageNum,pageSize);
        List<TransferTransaction> transferTransactionList = userMapper.selectTransferRecordPages(queryConditions,idList,customerId);
        PageInfo pageInfo = new PageInfo(transferTransactionList);
        Pages pages = new Pages<>(pageInfo.getPageNum(),pageInfo.getSize(),pageInfo.getTotal(),pageInfo.getPages(),transferTransactionList);
        return new ResponseResult<>(200,"查出来的捏",pages);
    }

    @Override
    @InvokeVerifyCode
    public ResponseResult queryCardNumberByCardId(String verifyCode, int cardId) {
        String cardNumber = userMapper.selectCardNumberByCardId(cardId);
        return new ResponseResult(200,"查询银行卡成功",cardNumber);
    }
}
