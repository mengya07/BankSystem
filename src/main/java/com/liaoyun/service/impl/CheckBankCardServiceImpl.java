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
    BankCardMapper bankCardMapper;

    /**
     *
     * @param cardNumber
     * @param password
     * @return 密码正确返回查询到的卡信息 失败返回null
     */
    @Override
    public BankCardInfo checkCardNumberAndPassword(String cardNumber, String password) {
        BankCardInfo bankCardInfo = bankCardMapper.selectCardInfoByCardNumber(null,cardNumber);
        String bankCardPassword = bankCardMapper.selectBankCardPasswordByCardId(bankCardInfo.getCardId());
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (bCryptPasswordEncoder.matches(password,bankCardPassword)) {
            return bankCardInfo;
        }
        return null;
    }
}
