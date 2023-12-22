package com.liaoyun.domain.requestType;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AmountAndPassword {
    private BigDecimal amount;
    private String password;
    private Integer payerCardId;
    private String orderId;
}
