package com.liaoyun.utils;

public class LuhnCheck {

    public static boolean luhnCheck(String cardNumber) {
        int[] cardDigits = new int[cardNumber.length()];
        for (int i = 0; i < cardNumber.length(); i++) {
            cardDigits[i] = Character.getNumericValue(cardNumber.charAt(i));
        }

        for (int i = cardDigits.length - 2; i >= 0; i -= 2) {
            int digit = cardDigits[i];
            digit *= 2;

            if (digit > 9) {
                digit -= 9;
            }

            cardDigits[i] = digit;
        }

        int sum = 0;
        for (int digit : cardDigits) {
            sum += digit;
        }

        return sum % 10 == 0;
    }

    public static void main(String[] args) {
        String cardNumber = "6216636109000220886";
        if (luhnCheck(cardNumber)) {
            System.out.println("银行卡号有效！");
        } else {
            System.out.println("银行卡号无效！");
        }
    }

}
