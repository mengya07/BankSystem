package com.liaoyun.mapper;

import com.liaoyun.domain.dataBaseType.CustomerInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CustomerInfoMapper {
    CustomerInfo selectCustomerInfo(Integer customerId);

    Integer updateCustomerInfo(CustomerInfo customerInfo,Integer customerId);
}
