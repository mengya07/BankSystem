package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferTransaction {
    private int transactionId;
    private int senderCustomerId;
    private int receiverCustomerId;
    private BigDecimal amount;
    private Timestamp transferDate;

    public TransferTransaction(int senderCustomerId, int receiverCustomerId, BigDecimal amount, Timestamp transferDate) {
        this.senderCustomerId = senderCustomerId;
        this.receiverCustomerId = receiverCustomerId;
        this.amount = amount;
        this.transferDate = transferDate;
    }
}
