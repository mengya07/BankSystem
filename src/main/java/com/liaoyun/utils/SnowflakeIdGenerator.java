package com.liaoyun.utils;

import org.springframework.stereotype.Component;

@Component
public class SnowflakeIdGenerator {
    // 起始时间戳，例如：2021-01-01 00:00:00
    private static final long EPOCH = 1609459200000L;

    // 机器ID所占位数
    private static final long WORKER_ID_BITS = 10L;

    // 最大允许的机器ID，即2^10 - 1
    private static final long MAX_WORKER_ID = -1L ^ (-1L << WORKER_ID_BITS);

    // 序列号所占位数
    private static final long SEQUENCE_BITS = 12L;

    // 机器ID左移位数
    private static final long WORKER_ID_SHIFT = SEQUENCE_BITS;

    // 时间戳左移位数
    private static final long TIMESTAMP_LEFT_SHIFT = SEQUENCE_BITS + WORKER_ID_BITS;

    // 序列号的掩码，即2^12 - 1
    private static final long SEQUENCE_MASK = -1L ^ (-1L << SEQUENCE_BITS);

    private long workerId = 114514L;
    private long sequence = 0L;
    private long lastTimestamp = -1L;

    public SnowflakeIdGenerator(){}
    public SnowflakeIdGenerator(long workerId) {
        if (workerId > MAX_WORKER_ID || workerId < 0) {
            throw new IllegalArgumentException("Worker ID can't be greater than " + MAX_WORKER_ID + " or less than 0");
        }
        this.workerId = workerId;
    }

    // 生成唯一ID的方法
    public synchronized long generateId() {
        long timestamp = System.currentTimeMillis();

        if (timestamp < lastTimestamp) {
            throw new RuntimeException("Clock moved backwards. Refusing to generate ID for " + (lastTimestamp - timestamp) + " milliseconds.");
        }
        //前部时间戳一样的话就序列号增大
        if (lastTimestamp == timestamp) {
            sequence = (sequence + 1) & SEQUENCE_MASK;
            if (sequence == 0) {
                timestamp = tilNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }

        lastTimestamp = timestamp;

        return ((timestamp - EPOCH) << TIMESTAMP_LEFT_SHIFT) |
                (workerId << WORKER_ID_SHIFT) |
                sequence;
    }

    // 等待直到下一个毫秒
    private long tilNextMillis(long lastTimestamp) {
        long timestamp = System.currentTimeMillis();
        while (timestamp <= lastTimestamp) {
            timestamp = System.currentTimeMillis();
        }
        return timestamp;
    }

//    public static void main(String[] args) {
//        SnowflakeIdGenerator idGenerator = new SnowflakeIdGenerator(1);
//
//        for (int i = 0; i < 10; i++) {
//            long id = idGenerator.generateId();
//            System.out.println("Generated Snowflake ID: " + id);
//        }
//    }
}
