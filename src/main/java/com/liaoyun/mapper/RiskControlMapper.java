package com.liaoyun.mapper;

import com.liaoyun.domain.dataBaseType.CustomerRiskControl;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Mapper
@Repository
public interface RiskControlMapper {
    BigDecimal selectAmountDailyLimit(Integer customerId);
}
