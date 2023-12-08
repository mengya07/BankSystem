package org.example;

import com.liaoyun.utils.RedisCache;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Test01 {

    @Autowired
    RedisCache redisCache;
    @Test
    public void test(String[] args) {
        redisCache.setCacheObject("test01","时间设置十秒");
        if(redisCache.expire("test01",30)){
            System.out.println("时间设置成功");
        }else {
            System.out.println("时间设置失败");
        }
    }
}
