package com.liaoyun.domain.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRecordDetails {
    private int inOrOut;
    private int senderCardId;
    private String payerName;
    private String payerCardNumber;
    private String payeeName;
    private String payeeCardNumber;
    private BigDecimal transferAmount;
    private String postscript;
    private int serialNumber;
    private byte status;
    private Date transferTime;
}
