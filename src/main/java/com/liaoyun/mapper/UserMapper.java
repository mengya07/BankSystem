package com.liaoyun.mapper;

import com.liaoyun.domain.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;


@Mapper
@Repository
public interface UserMapper {

    loginUser login(loginUser user);

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

    BankCardInfo selectCardInfoByCardNumber(String name,String cardNumber);

    void updateBankCardBalance(String cardNumber,BigDecimal newBalance);

    int insertTransferTransaction(TransferTransaction transferTransaction);
}
