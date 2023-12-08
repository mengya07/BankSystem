package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerInfo {
    int customerId;
    String Name;
    Date dateOfBirth;
    String address;
    String phoneNumber;
    String email;
    String identityCard;
    int userId;
    byte isActive;
    Timestamp createdAt;
}
