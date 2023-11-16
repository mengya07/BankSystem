package com.liaoyun.resolver;

import org.springframework.stereotype.Indexed;

import java.lang.annotation.*;

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface CurrentUserId {

}
