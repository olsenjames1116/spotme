package com.olsenjames1116.spotme.service;

import java.util.ArrayList;
import java.util.List;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.olsenjames1116.spotme.dao.UserRepository;
import com.olsenjames1116.spotme.entity.User;

@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;

    // Constructor injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Retrieve all users
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // Save a user
    public void save(User user) {
        this.userRepository.save(user);
    }

    // Load user by username
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find user by username
        User user = userRepository.findByUsername(username);

        // Check if user exists
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // Create UserDetails object with user details
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(), new ArrayList<>());
    }
}
