package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DomainWithVerifyCode <T>{
    private Integer cardId;
    private String phoneNumber;
    private T pojo;
    private String verifyCode;
}
