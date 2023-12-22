package com.liaoyun.domain.responseType;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NameAndCardNumber {
    private String payeeName;
    private String payeeCardNumber;
}
