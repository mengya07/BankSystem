package com.liaoyun.domain.dataBaseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankCardInfo {
    Integer cardId;
    String cardNumber;
    String cardHolderName;
    String reservePhoneNumber;
    BigDecimal balance;
    Integer customerId;
    Integer openAccountBank;
    byte isActive;
    Timestamp createdAt;
    byte isBind;

    public BankCardInfo(int cardId, String cardNumber) {
        this.cardId = cardId;
        this.cardNumber = cardNumber;
    }
}
