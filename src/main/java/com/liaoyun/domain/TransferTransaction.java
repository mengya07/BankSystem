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
    private int senderCardId;
    private int receiverCardId;
    private BigDecimal amount;
    private Timestamp transferDate;
    private byte status ;
    public TransferTransaction(int senderCardId, int receiverCardId, BigDecimal amount, Timestamp transferDate,byte status) {
        this.senderCardId = senderCardId;
        this.receiverCardId = receiverCardId;
        this.amount = amount;
        this.transferDate = transferDate;
        this.status = status;
    }

}
