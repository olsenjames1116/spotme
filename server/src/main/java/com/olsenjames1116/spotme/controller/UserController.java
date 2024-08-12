package com.olsenjames1116.spotme.controller;

import org.springframework.web.bind.annotation.RestController;
import com.olsenjames1116.spotme.entity.User;
import com.olsenjames1116.spotme.service.UserService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @PostMapping("/users")
    public void saveUser(@RequestBody User user) {
        user.setId(0);
        user.setBalance(1000.00);
        user.setEnabled(1);

        this.userService.save(user);
    }
}
