package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferUnit {
    private int payerId;
    private String payerCardNumber;
    private String payeeName;
    private String payeeCardNumber;
    private BigDecimal transferAmount;
}
