package com.liaoyun.domain.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRecordDetails {

    private String transactionAccount;
    private BigDecimal balance;
    private String counterpartyName;
    private String counterpartyAccount;
    private BigDecimal amount;
    private String postscript;
    //成功或失败，收入或支出
    private byte status;
    private String statusComments;
    private Long transactionId;
    private Timestamp transferTime;
}
