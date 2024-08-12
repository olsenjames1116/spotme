package com.olsenjames1116.spotme.controller;

import org.springframework.web.bind.annotation.RestController;
import com.olsenjames1116.spotme.entity.User;
import com.olsenjames1116.spotme.service.UserService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return this.userService.findAll();
    }

}
