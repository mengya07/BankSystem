package com.liaoyun.service.impl;

import com.liaoyun.domain.dataBaseType.BankCardInfo;
import com.liaoyun.mapper.BankCardMapper;
import com.liaoyun.mapper.UserMapper;
import com.liaoyun.service.CheckBankCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CheckBankCardServiceImpl implements CheckBankCardService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    BankCardMapper bankCardMapper;
    //成功返回卡ID
    //失败返回-1
    @Override
    public BankCardInfo checkCardNumberAndPassword(String cardNumber, String password) {
        BankCardInfo bankCardInfo = bankCardMapper.selectCardInfoByCardNumber(cardNumber);
        String bankCardPassword = userMapper.selectBankCardPasswordByCardId(bankCardInfo.getCardId());
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (bCryptPasswordEncoder.matches(password,bankCardPassword)) {
            return bankCardInfo;
        }
        return null;
    }
}
