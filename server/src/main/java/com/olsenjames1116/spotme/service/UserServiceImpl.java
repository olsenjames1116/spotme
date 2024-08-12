package com.olsenjames1116.spotme.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.olsenjames1116.spotme.dao.UserRepository;
import com.olsenjames1116.spotme.entity.User;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
