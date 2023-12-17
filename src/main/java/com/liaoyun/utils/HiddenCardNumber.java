package com.liaoyun.utils;

public class HiddenCardNumber {
    public static String HiddenNumber(String cardNumber){
        // 获取字符串的前四位
        String firstFour = cardNumber.substring(0, 4);
        // 获取字符串的后四位
        String lastFour = cardNumber.substring(cardNumber.length() - 4);

        // 构造隐藏中间部分的字符串
        StringBuilder maskedMiddle = new StringBuilder();
        for (int i = 0; i < cardNumber.length() - 8; i++) {
            maskedMiddle.append("*");
        }
        // 组合隐藏后的字符串
        cardNumber = firstFour + maskedMiddle + lastFour;
        return cardNumber;
    }

}
