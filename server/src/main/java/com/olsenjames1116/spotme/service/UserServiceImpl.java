package com.olsenjames1116.spotme.service;

import com.olsenjames1116.spotme.dao.UserRepository;

public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
