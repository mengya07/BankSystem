package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankCardInfo {
    int cardId;
    String cardNumber;
    String cardHolderName;
    BigDecimal balance;
    int customerId;
    byte isActive;

    Timestamp createdAt;
}
