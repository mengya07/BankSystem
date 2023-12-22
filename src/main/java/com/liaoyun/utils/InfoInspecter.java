package com.liaoyun.utils;

import com.liaoyun.domain.RegisterInfo;
import com.liaoyun.domain.ResponseResult;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 检查用户提交的注册信息是否规范的工具类
 * @author 潘明
 * @version 1.0
 *
 */
public class InfoInspecter {
    //检验手机号格式是否正确
    public static boolean checkPhoneNumber(String phoneNumber){
        String pattern = "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$";
        return Pattern.matches(pattern, phoneNumber);
    }
    //检验身份证号格式是否正确
    public static boolean checkIdentityCard(String idCard){
        // 正则表达式用于匹配身份证号码的格式
        String regex = "^\\d{17}(\\d|X|x)$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(idCard);

        if (!matcher.matches()) {
            return false;
        }

        // 将身份证号码前17位转换为数字数组
        int[] idDigits = new int[17];
        for (int i = 0; i < 17; i++) {
            idDigits[i] = Character.getNumericValue(idCard.charAt(i));
        }

        // 加权因子
        int[] weights = new int[17];
        for (int i = 0; i < 17; i++) {
            weights[i] = (int) Math.pow(2, 17 - i) % 11;
        }

        // 计算校验位
        int checksum = 0;
        for (int i = 0; i < 17; i++) {
            checksum += idDigits[i] * weights[i];
        }
        int remainder = checksum % 11;
        char[] checkDigits = {'1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'};
        char checkDigit = checkDigits[remainder];

        // 校验位验证
        return Character.toUpperCase(idCard.charAt(17)) == checkDigit;
    }

    //检验密码格式是否正确
    public static boolean checkPassword(String password){
        int length=password.length();
        if(length<8||length>15)return false;
        boolean numflag=false;
        boolean letterflag=false;
        for(int i=0;i<length;i++){
            if(Character.isDigit(password.charAt(i))){
                numflag=true;
            }
            if(Character.isLetter(password.charAt(i))){
                letterflag=true;
            }
        }
        if(numflag&&letterflag){
            return true;
        }
        else return false;
    }


    public static boolean checkBankCard(String cardNumber) {
        // 去除空格
        String strippedCardNumber = cardNumber.replaceAll("\\s", "");

        // 检查是否为数字
        if (!strippedCardNumber.matches("\\d+")) {
            return false;
        }

        // 转换为数字数组
        int[] digits = new int[strippedCardNumber.length()];
        for (int i = 0; i < strippedCardNumber.length(); i++) {
            digits[i] = Character.getNumericValue(strippedCardNumber.charAt(i));
        }

        // 反转数组
        for (int i = 0, j = digits.length - 1; i < j; i++, j--) {
            int temp = digits[i];
            digits[i] = digits[j];
            digits[j] = temp;
        }

        // 计算校验和
        int sum = 0;
        for (int i = 0; i < digits.length; i++) {
            int digit = digits[i];

            // 双数位上的数字乘以2
            if (i % 2 == 1) {
                digit *= 2;

                // 大于9的数字减去9
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
        }

        // 校验和为10的倍数则有效
        return sum % 10 == 0;
    }

    public static ResponseResult checkInfo(RegisterInfo UserInfo){
        if(!checkPhoneNumber(UserInfo.getAccountUserInfo().getPhoneNumber())){
            return new ResponseResult<>(412,"电话号码格式错误");
        }else if(!checkIdentityCard(UserInfo.getAccountUserInfo().getIdentityCard())){
            return new ResponseResult<>(412,"身份证格式错误");
        }else if(!checkPassword(UserInfo.getAccountUserPassword().getPassword())){
            return new ResponseResult<>(412,"密码格式错误");
        }
        return null;
    }




    public static void main(String[] args) {
        System.out.println(checkPhoneNumber(("18178481190")));
        System.out.println(checkPhoneNumber(("15505819189")));
        System.out.println(checkIdentityCard("36253120040112033X"));
        System.out.println(checkBankCard("6216636109000224342"));
        System.out.println(checkBankCard("6216636110000220884"));
    }
}
