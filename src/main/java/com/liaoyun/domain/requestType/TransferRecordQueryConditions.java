package com.liaoyun.domain.requestType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferRecordQueryConditions {
    private int cardId;
    private Timestamp startDate;
    private Timestamp endDate;
    private BigDecimal miniAmount;
    private BigDecimal maxAmount;
    private String payeeName;
    private String payeePhoneNumber;
    private byte status;
    private boolean payeeLimit;
}
