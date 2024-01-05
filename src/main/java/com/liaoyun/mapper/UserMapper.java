package com.liaoyun.mapper;

import com.liaoyun.domain.dataBaseType.*;
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


    Integer selectCustomerIdByUserId(int userId);

    BankCardInfo selectBalanceByCustomerId(int customerId);

    List<BankCardInfo> selectBankCardsByCustomerId(int customerId);

    CustomerInfo selectCustomerInfo(int customerId);

    BigDecimal selectBalanceByCardNumber(String cardNumber);


    AccountUserPassword selectPasswordByUserId(int userId);

    int updateAppPassword(AccountUserPassword accountUserPassword);


    boolean selectCustomerInfoExists(CustomerInfo customerInfo);

    Boolean selectIdentityExits(String identityCard);

    int updateCustomerInfo(CustomerInfo customerInfo);

    int updateAppUserInfo(AccountUserInfo accountUserInfo);

    String selectPaymentPassword(Integer userId);

    Integer inserterUserPaymentPassword();

    Integer updatePaymentPassword(Integer userId);

    Integer updateFailedAttempts(String userName);

    Integer updateUserPaymentPassword(Integer userId, String encodePassword);
}
