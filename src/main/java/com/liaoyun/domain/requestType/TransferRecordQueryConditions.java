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
    private Integer cardId;
    private Timestamp startTime;
    private Timestamp endTime;
    private BigDecimal miniAmount;
    private BigDecimal maxAmount;
    private String payeeName;
    private String payeeCardNumber;
    private byte status;
    private boolean payeeLimit;
}
