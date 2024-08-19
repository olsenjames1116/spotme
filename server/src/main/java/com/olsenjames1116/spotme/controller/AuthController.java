package com.olsenjames1116.spotme.controller;

import com.olsenjames1116.spotme.model.AuthenticationRequest;
import com.olsenjames1116.spotme.model.AuthenticationResponse;
import com.olsenjames1116.spotme.service.UserService;
import com.olsenjames1116.spotme.security.JwtUtil;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<ArrayList<String>> registerUser(@RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("confirmPassword") String confirmPassword) {
        System.out.println(username + ", " + password + ", " + confirmPassword);

        // Save the user to the database
        try {
            userService.save(username, password, confirmPassword);
            ArrayList<String> successArray = new ArrayList<String>();
            successArray.add("User registered successfully");

            return new ResponseEntity<ArrayList<String>>(successArray, HttpStatus.OK);
        } catch (Exception e) {
            ArrayList<String> errorArray = new ArrayList<String>();
            errorArray.add(e.getMessage());

            return new ResponseEntity<ArrayList<String>>(errorArray, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public AuthenticationResponse loginUser(
            @RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        // Authenticate the user
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUsername(), authenticationRequest.getPassword()));

        // Print authentication request for debugging
        System.out.println("authentication request" + authenticationRequest);

        // Retrieve user details
        final UserDetails userDetails =
                userService.loadUserByUsername(authenticationRequest.getUsername());

        // Generate JWT token
        final String jwt = jwtUtil.generateToken(userDetails);

        AuthenticationResponse response = new AuthenticationResponse(jwt);
        response.setStatus(HttpStatus.OK);
        response.setMessage("Login successful");

        // Return the JWT token
        return response;
    }
}
