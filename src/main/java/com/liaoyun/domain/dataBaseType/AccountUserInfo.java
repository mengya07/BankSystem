package com.liaoyun.domain.dataBaseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountUserInfo {
    private Integer userId;

    private String phoneNumber;

    private String identityCard;

    private Integer customerId;

    private String permissions;

    private byte isBind;
    public AccountUserInfo (String phoneNumber,String permissions,byte isBind){
        this.permissions = permissions;
        this.phoneNumber = phoneNumber;
        this.isBind = isBind;
    }

    public AccountUserInfo(Integer userId, String permissions) {
        this.userId = userId;
        this.permissions = permissions;
    }
}
