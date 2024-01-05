package com.liaoyun.domain.responseType;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TDOrderId {
    private String orderId;
    private Integer payeeUserId;
}
