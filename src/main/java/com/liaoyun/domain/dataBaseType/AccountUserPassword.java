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

    public AccountUserPassword(String userName){
        this.userName = userName;
    }

}
