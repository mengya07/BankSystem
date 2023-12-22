package com.liaoyun.domain.requestType;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Password {
    String loginPassword;
    String paymentPassword;
}
