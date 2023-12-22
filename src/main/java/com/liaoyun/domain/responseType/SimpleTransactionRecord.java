package com.liaoyun.domain.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleTransactionRecord {
    private String transactionId;
    private String counterpartyName;
    private BigDecimal balance;
    private BigDecimal amount;
    private byte status;
    private String statusComments;
}
