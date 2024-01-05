package com.liaoyun.domain.dataBaseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountUserPassword {

    private Integer id;
    private Integer userId;
    private String userName;
    private String password;
    private Integer failedAttempts;
    public AccountUserPassword(String userName,String password){
        this.userName = userName;
        this.password = password;
    }

    public AccountUserPassword(String phoneNumber) {
        this.userName = phoneNumber;
    }

    public AccountUserPassword(Integer userId, String password) {
        this.userId = userId;
        this.password = password;
    }
}
