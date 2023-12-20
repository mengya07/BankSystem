package com.liaoyun.domain.dataBaseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferTransaction {
    private Long transactionId;
    private Integer senderCustomerId;
    private Integer senderCardId;
    private String senderCardNumber;
    private Integer receiverCardId;
    private String receiverCardNumber;
    private String receiverName;
    private BigDecimal amount;
    private Timestamp transferDate;
    private byte status ;
    private String postscript;
}
