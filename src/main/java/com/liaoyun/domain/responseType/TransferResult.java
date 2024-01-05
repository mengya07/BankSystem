package com.liaoyun.domain.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferResult {
    private String transactionId;
    private Timestamp transactionTime;
    private BigDecimal balance;
}
