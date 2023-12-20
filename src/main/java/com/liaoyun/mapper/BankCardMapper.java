package com.liaoyun.mapper;

import com.liaoyun.domain.dataBaseType.BankCardInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BankCardMapper {
    BankCardInfo selectSingleBankCard(Integer customerId, Integer cardId);
    List<BankCardInfo> selectBankCards(Integer customerId);

    BankCardInfo selectCardInfoByCardNumber(String cardNumber);
}
