package com.liaoyun.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pages<T>{

        private int currentPage;
        private int currentCount;
        private Long totalRecord;
        private int totalPage;
        // 5.每页的显示数据，数据库得到
        List<T> list = new ArrayList<>();

}
