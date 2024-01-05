package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservePhoneAndCardId {
    private String reservePhoneNumber;
    private Integer cardId;
}
