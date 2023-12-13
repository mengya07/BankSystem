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
    private int customerId;
    private String surname;
    private String name;
    private Date dateOfBirth;
    private String address;
    private String phoneNumber;
    private String email;
    private String identityCard;
    private int userId;
    private byte isActive;
    private Timestamp createdAt;
}
