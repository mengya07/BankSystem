package com.liaoyun.domain.dataBaseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRiskControl {
    private Integer id;
    private Integer customerId;
    private BigDecimal amountUpperLimit;
    private BigDecimal amountDailyLimit;
}
