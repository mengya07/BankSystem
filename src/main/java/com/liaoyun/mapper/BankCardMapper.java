package com.liaoyun.mapper;

import com.liaoyun.domain.dataBaseType.BankCardInfo;
import com.liaoyun.domain.responseType.NameAndCardNumber;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Mapper
@Repository
public interface BankCardMapper {
    /**
     *查询（激活的）单卡详细消息
     */
    BankCardInfo selectSingleBankCard(Integer customerId, Integer cardId);

    /**
     *查询某用户所有激活卡的隐藏卡号和余额
     */
    List<BankCardInfo> selectBankCards(Integer customerId);

    /**
     *格局银行卡号查询查询银行卡详细信息（同时验证）
     */
    BankCardInfo selectCardInfoByCardNumber(String name,String cardNumber);

    Integer updateBankCardBalance(Integer cardId, BigDecimal newBalance);

    List<Integer> selectCardId(Integer customerId,Integer cardId);

//    String selectCardNumberByCardId(int cardId);
    /**
     *查询卡号（查看真实卡号）
     */
    String selectCardNumberByCardId(int cardId);
    /**
     *根据卡Id查询银行卡密码
     */
    String selectBankCardPasswordByCardId(int cardId);
    /**
     *更新银行卡的激活状态
     */
    Integer updateBankCardStatus(byte isActive, byte isBind,int cardId);

    NameAndCardNumber selectNameAndCardNumber(Integer CardId);
}
