package com.liaoyun.domain.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleTransferRecord {
    private String transactionId;
    private String payerName;
    private String payerCardNumber;
    private BigDecimal transferAmount;
    private byte status;
    private String statusComments;
    private Date transferTime;

}
