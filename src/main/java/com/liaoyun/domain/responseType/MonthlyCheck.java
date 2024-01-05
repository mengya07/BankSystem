package com.liaoyun.domain.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.YearMonthTypeHandler;

import java.math.BigDecimal;
import java.time.YearMonth;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyCheck {
    private YearMonth yearMonth;
    private BigDecimal outcome;
    private BigDecimal income;
}
