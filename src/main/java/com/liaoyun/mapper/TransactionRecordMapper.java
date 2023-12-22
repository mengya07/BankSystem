package com.liaoyun.mapper;

import com.liaoyun.domain.dataBaseType.TransferTransaction;
import com.liaoyun.domain.requestType.TransferRecordQueryConditions;
import com.liaoyun.domain.responseType.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TransactionRecordMapper {
    int insertTransferTransaction(TransferTransaction transferTransaction);

    List<SimpleTransferRecord> selectTransferRecordPages(TransferRecordQueryConditions queryConditions, List<Integer> idList, int customerId);

    List<SimpleTransactionRecord> selectTransactionRecordPages(TransferRecordQueryConditions queryConditions, Integer customerId);

    TransferRecordDetails selectTransferDetails(int customerId, Long transactionId);
    TransactionRecordDetails selectTransactionDetails(int customerId, Long transactionId);

    List<MonthlyCheck> selectMonthlyCheck(Integer customerId);
}
