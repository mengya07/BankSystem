package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferRecordQueryConditions {
    private Timestamp startDate;
    private Timestamp endDate;
    private String cardNumber;
    private BigDecimal miniAmount;
    private BigDecimal maxAmount;
    private String payeeName;
    private String payeePhoneNumber;
    private byte status;
    private boolean payeeLimit;
}
