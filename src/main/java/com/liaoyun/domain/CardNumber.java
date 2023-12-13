package com.liaoyun.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardNumber {
    private int cardId;
    private String verifyCode;
}
