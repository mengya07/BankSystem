package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankCardPassword {
    int passwordId;
    int cardId;
    String hashedPassword;
    Timestamp createdAt;
}
