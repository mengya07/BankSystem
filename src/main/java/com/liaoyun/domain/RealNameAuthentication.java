package com.liaoyun.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RealNameAuthentication {
    private String surname;
    private String name;
    private String identityCard;
    private int customerId;
    private int cardId;


}
