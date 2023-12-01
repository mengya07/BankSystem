package com.liaoyun.service;


public interface TransferMoneyService {

    //TODO 把余额查出来显示

    //TODO 查询账户下的银行卡显示
    //用户输入转账信息
    //用户点击确认转账
    //TODO 调用发送验证码服务
    //TODO 保存验证码到redis 格式：transfer.银行卡号:验证码
    //用户输入验证码
    //TODO 前端把付款信息和验证码发送过来
    //TODO 检查redis有没有保存验证码，有就发送，没有就重新生成后发送

}
