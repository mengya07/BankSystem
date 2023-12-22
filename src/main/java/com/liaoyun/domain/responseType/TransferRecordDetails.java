package com.liaoyun.domain.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferRecordDetails {

    private String senderName;
    private String senderCardNumber;
    private String receiverName;
    private String receiverCardNumber;
    private BigDecimal amount;
    private String postscript;
    //成功或失败，收入或支出
    private byte status;
    private String statusComments = "转账金额（人民币元）";
    private Long transactionId;
    private Timestamp transferTime;
}
