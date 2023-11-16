package com.liaoyun.thymeleaf;

import com.liaoyun.domain.User;
import com.liaoyun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class ThymeleafController {

    @Autowired
    private UserService userService;

    @RequestMapping("/thymeleaf/user")
    public String users(Model model){
        //获取数据
        List<User> users = userService.findAll();
        //往域中存入数据
        model.addAttribute("users",users);
        model.addAttribute("msg","caonima thymleaf");
        //页面跳转
        return "table-standard";
    }
}
