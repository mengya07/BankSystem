package com.liaoyun.domain.dataBaseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerInfo {
    private Integer customerId;
    private String surname;
    private String name;
    private Date dateOfBirth;
    private String address;
    private String phoneNumber;
    private String email;
    private String identityCard;
    private byte isActive;
    private Timestamp createdAt;
}
