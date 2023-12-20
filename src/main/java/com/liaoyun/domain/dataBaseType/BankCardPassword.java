package com.liaoyun.domain.dataBaseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankCardPassword {
    Integer passwordId;
    Integer cardId;
    String hashedPassword;
    Timestamp createdAt;
}
