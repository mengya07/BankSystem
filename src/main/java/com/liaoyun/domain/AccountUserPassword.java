package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountUserPassword {

    private int id;
    private int userId;
    private String userName;
    private String password;

    public AccountUserPassword(String userName){
        this.userName = userName;
    }

}
