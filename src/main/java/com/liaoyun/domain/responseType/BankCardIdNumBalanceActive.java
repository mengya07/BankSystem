package com.liaoyun.domain.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankCardIdNumBalanceActive {
    private Integer cardId;
    private String cardNumber;
    private BigDecimal balance;
    private byte isActive;

}
