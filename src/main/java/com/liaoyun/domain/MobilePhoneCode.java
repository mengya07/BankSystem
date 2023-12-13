package com.liaoyun.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MobilePhoneCode {
    private String phoneNumber;
//    @JsonProperty(value = "vCode")
    private String code;
}
