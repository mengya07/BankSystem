package com.liaoyun.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;
/**
* JWT工具类
*/
    public class JwtUtil {
    //有效期为
    //TODO 记得改
    public static final Long JWT_TTL = 24 *60 * 60 *1000L;// 60 * 60 *1000 一个小时
    //设置秘钥明文
    public static final String JWT_KEY = "liaoyun";
    public static String getUUID(){
        String token = UUID.randomUUID().toString().replaceAll("-", "");
        return token;
    }
    /**
    * 生成jtw
    * @param subject token中要存放的数据（json格式）
    * @return
    */
    public static String createJWT(String subject) {
        JwtBuilder builder = getJwtBuilder(subject, null, getUUID());// 设置过期时间
        return builder.compact();
    }
    /**
    * 生成jtw
    * @param subject token中要存放的数据（json格式）
    * @param ttlMillis token超时时间
    * @return
    */
    public static String createJWT(String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, getUUID());// 设置过期时间
        return builder.compact();
    }
    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis,
    String uuid) {
        //选择加密算法
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        SecretKey secretKey = generalKey();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if(ttlMillis==null){
        ttlMillis=JwtUtil.JWT_TTL;
    }
        long expMillis = nowMillis + ttlMillis;//默认过期时间一个小时
        Date expDate = new Date(expMillis);
        return Jwts.builder()
        .setId(uuid) //唯一的ID
        .setSubject(subject) // 主题 可以是JSON数据
        .setIssuer("pm") // 签发者
        .setIssuedAt(now) // 签发时间
        .signWith(signatureAlgorithm, secretKey) //使用HS256对称加密算法签 名, 第二个参数为秘钥
        .setExpiration(expDate);
    }
    /**
    * 创建token
    * @param id
    * @param subject
    * @param ttlMillis
    * @return
    */
    public static String createJWT(String id, String subject, Long ttlMillis) {
    JwtBuilder builder = getJwtBuilder(subject, ttlMillis, id);// 设置过期时间
        return builder.compact();
        }
    public static void main(String[] args) throws Exception {
        String token = JwtUtil.createJWT("1108");
        String token1 = JwtUtil.createJWT("liaoyun","1108",100000000L);
        Claims claims = parseJWT("eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxOGRlNDg0N2U3ODQ0MDViOWFkMzllZjU5MjkzYzkxOSIsInN1YiI6IjMyIiwiaXNzIjoic2ciLCJpYXQiOjE3MDA1NTcxMjksImV4cCI6MTcwMDU2MDcyOX0._VkCxYYrlMZKCqAhuXJdbPcXLOU5xaUW3B-HC15C4Qs");
        System.out.println(token);
        System.out.println(claims.getSubject());
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        System.out.println(bCryptPasswordEncoder.encode("1108"));
    }
    /**
    * 生成加密后的秘钥 secretKey
    * @return
    */
    public static SecretKey generalKey() {
        byte[] encodedKey = Base64.getDecoder().decode(JwtUtil.JWT_KEY);
        SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length,
        "AES");
        return key;
    }
    /**
    * 解析
    *
    * @param jwt
    * @return
    * @throws Exception
    */
    public static Claims parseJWT(String jwt) throws Exception {
        SecretKey secretKey = generalKey();
        return Jwts.parser()
        .setSigningKey(secretKey)
        .parseClaimsJws(jwt)
        .getBody();
    }
}