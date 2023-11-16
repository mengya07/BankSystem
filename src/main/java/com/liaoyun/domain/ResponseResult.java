package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResponseResult<T>{

    private Integer code;

    private String errorMessage;

    private T data;

    public ResponseResult(Integer code, String errorMessage) {
        this.code = code;
        this.errorMessage = errorMessage;
    }

}
