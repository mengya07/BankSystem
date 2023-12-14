package com.liaoyun.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddBankCardInfo {
    private String cardNumber;
    private String password;
    private String phoneNumber;
}
