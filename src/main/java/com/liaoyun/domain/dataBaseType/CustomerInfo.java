package com.liaoyun.domain.dataBaseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerInfo {
    /**
     * 客户序号
     */
//    private Integer customerId;
    /**
     * 姓
     */
    private String surname;
    /**
     * 名
     */
    private String name;
    /**
     * 姓名拼音
     */
    private String spellName;
    /**
     * 身份证
     */
    private String identityCard;
    /**
     * 民族
     */
    private String nationality;
    /**
     * 性别
     */
    private String sex;
    /**
     * 出生日期
     */
    private Date dateOfBirth;
    /**
     * 出生地
     */
    private String placeOfBirth;
    /**
     * 地址 省/市/区
     */
    private String provincesCity;
    /**
     * 详细地址
     */
    private String detailedAddress;
    /**
     * 邮政编码
     */
    private String postalCode;
    /**
     * 职业
     */
    private String profession;
    /**
     * 工作单位名称
     */
    private String workOfUnit;
    /**
     * 单位所属行业
     */
    private String industryOfTheOrganization;
    /**
     * 个人收入区间
     */
    private String incomeRange;
    /**
     * 手机号码
     */
    private String phoneNumber;

    /**
     * 是否活账户
     */
    private byte isActive;

}
