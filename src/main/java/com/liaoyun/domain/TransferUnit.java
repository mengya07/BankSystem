package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferUnit {
    private Integer senderCustomerId;
    private Integer senderCardId;
    private String receiverCardNumber;
    private String receiverName;
    private BigDecimal Amount;
    private String postscript;
}
