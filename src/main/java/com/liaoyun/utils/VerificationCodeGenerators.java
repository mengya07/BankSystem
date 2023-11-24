package com.liaoyun.utils;

import java.util.Random;

public class VerificationCodeGenerators {
    public static String generate(){
        Random rand = new Random();
        int num = rand.nextInt(900000) + 100000;
        return Integer.toString(num);
    }
}
