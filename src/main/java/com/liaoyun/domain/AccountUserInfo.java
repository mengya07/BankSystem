package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserInfo {
    private int userId;

    private String phoneNumber;

    private String identityCard;

    private String permissions;
}
