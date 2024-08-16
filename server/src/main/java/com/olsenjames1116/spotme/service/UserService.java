package com.olsenjames1116.spotme.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.olsenjames1116.spotme.dao.UserRepository;
import com.olsenjames1116.spotme.entity.User;

@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    // Constructor injection
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Retrieve all users
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // Save a user
    public void save(String username, String password, String confirmPassword) {
        if (username.isEmpty()) {
            throw new IllegalArgumentException("Username must not be empty");
        }

        if (username.length() > 50) {
            throw new IllegalArgumentException("Username must be less than 50 characters");
        }

        if (password.isEmpty()) {
            throw new IllegalArgumentException("Password must not be empty");
        }

        if (password.length() > 50) {
            throw new IllegalArgumentException("Password must be less than 50 characters");
        }

        if (confirmPassword.length() > 50) {
            throw new IllegalArgumentException("Password must be less than 50 characters");
        }

        if (!password.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User existingUser = userRepository.findByUsername(username);

        if (existingUser != null) {
            throw new IllegalArgumentException("User already exists");
        }

        User user = new User();

        // Set initial values for the user
        user.setUsername(username);
        user.setId(0);
        user.setBalance(1000.00);
        user.setEnabled(1);
        user.setPassword(passwordEncoder.encode(password));

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
