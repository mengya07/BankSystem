package com.liaoyun.service.impl;

import com.liaoyun.domain.CustomerInfo;
import com.liaoyun.domain.ResponseResult;
import com.liaoyun.domain.BankCardInfo;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.QueryInfoService;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        List<String> mapList = new ArrayList<>();
        for (BankCardInfo bankCardInfo: bankCardInfos ){
            //TODO 做跨行得获取银行卡对应的银行信息，还有一些银行卡信息（一类二类卡，是否激活，启用）
            //获取该用户所有银行卡号
            mapList.add(bankCardInfo.getCardNumber());
        }
        //返回银行卡全部非加密信息
        return new ResponseResult<>(200,"查询成功",mapList);
    }

    @Override
    public ResponseResult queryPersonalInformation(int customerId) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        CustomerInfo customerInfo = userMapper.selectCustomerInfo(customerId);
        Map<String, String> map = BeanUtils.describe(customerInfo);
        return new ResponseResult<>(200,"查询成功",map);
    }
}
