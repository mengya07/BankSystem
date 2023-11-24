package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterInfo {
    private String vCode;
    private AccountUserPassword accountUserPassword;
    private AccountUserInfo accountUserInfo;
}
