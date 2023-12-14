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
    private String senderCardNumber;
    private int receiverCardId;
    private String receiverCardNumber;
    private String receiverName;
    private BigDecimal amount;
    private Timestamp transferDate;
    private byte status ;
    private String postscript;
    public TransferTransaction(int senderCardId, int receiverCardId, BigDecimal amount, Timestamp transferDate,byte status,String postscript) {
        this.senderCardId = senderCardId;
        this.receiverCardId = receiverCardId;
        this.amount = amount;
        this.transferDate = transferDate;
        this.status = status;
        this.postscript = postscript;
    }

    public TransferTransaction(int senderCardId, String senderCardNumber, int receiverCardId, String receiverCardNumber,String receiverName, BigDecimal amount, Timestamp transferDate, byte status, String postscript) {
        this.senderCardId = senderCardId;
        this.senderCardNumber = senderCardNumber;
        this.receiverCardId = receiverCardId;
        this.receiverCardNumber = receiverCardNumber;
        this.receiverName = receiverName;
        this.amount = amount;
        this.transferDate = transferDate;
        this.status = status;
        this.postscript = postscript;
    }
}
