package com.olsenjames1116.spotme.controller;

import org.springframework.web.bind.annotation.RestController;
import com.olsenjames1116.spotme.entity.User;
import com.olsenjames1116.spotme.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return this.userService.findAll();
    }
}
