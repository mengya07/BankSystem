package com.liaoyun.domain.dataBaseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferTransaction {
    /**
     * 交易序列号
     */
    private Long transactionId;
    /**
     * 付款方的客户ID
     */
    private Integer senderCustomerId;
    /**
     * 付款方使用的cardID
     */
    private Integer senderCardId;
    /**
     * 付款方使用的卡号
     */
    private String senderCardNumber;
    /**
     * 付款方付款后余额
     */
    private BigDecimal senderBalance;
    /**
     * 付款方名字
     */
    private String senderName;
    /**
     * 收款方顾客ID
     */
    private Integer receiverCustomerId;
    /**
     * 接收方卡ID
     */
    private Integer receiverCardId;
    /**
     * 接收方卡号
     */
    private String receiverCardNumber;
    /**
     * 接收方收款后余额
     */
    private BigDecimal receiverBalance;
    /**
     * 接收方名字
     */
    private String receiverName;
    /**
     * 交易金额
     */
    private BigDecimal amount;
    /**
     * 交易时间
     */
    private Timestamp transferTime;
    /**
     * 交易状态
     */
    private byte status ;
    /**
     * 附言
     */
    private String postscript;
}
