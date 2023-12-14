package com.liaoyun.mapper;

import com.liaoyun.domain.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;


@Mapper
@Repository
public interface UserMapper {


    //根据用户名查询用户密码
    AccountUserPassword selectOne(String userName);

    String selectPermissionsById(int userId);//根据用户ID查询用户权限

    void insertUserPassword(AccountUserPassword accountUserPassword);

    void inserterUserInfo(AccountUserInfo accountUserInfo);


    int selectCustomerIdByUserId(int userId);

    BankCardInfo selectBalanceByCustomerId(int customerId);

    List<BankCardInfo> selectBankCardsByCustomerId(int customerId);

    CustomerInfo selectCustomerInfo(int customerId);

    BigDecimal selectBalanceByCardNumber(String cardNumber);

    BankCardInfo selectCardInfoByCardNumber(String cardNumber);

    void updateBankCardBalance(int cardId,BigDecimal newBalance);

    int insertTransferTransaction(TransferTransaction transferTransaction);

    List<Integer> selectCardId( int customerId,int cardId);
    List<TransferTransaction> selectTransferRecordPages(TransferRecordQueryConditions queryConditions,List<Integer> idList,int customerId);

    AccountUserPassword selectPasswordByUserId(int userId);

    int updateAppPassword(AccountUserPassword accountUserPassword);

    String selectCardNumberByCardId(int cardId);

    boolean selectCustomerInfoExists(CustomerInfo customerInfo);

    Boolean selectIdentityExits(String identityCard);

    String selectBankCardPasswordByCardId(int cardId);

    int updateCustomerInfo(CustomerInfo customerInfo);

    int updateAppUserInfo(AccountUserInfo accountUserInfo);

    int updateBankCardStatus(byte isActive, byte isBind,int cardId);

    TransferTransaction selectTransactionDetails(int transactionId);
}
