package com.olsenjames1116.spotme.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class SecurityConfig {
    @Bean
    public InMemoryUserDetailsManager inMemoryUserDetailsManager() {
        UserDetails james =
                User.builder().username("james").password("{noop}password").roles("USER").build();
        UserDetails kayla = User.builder().username("kayla").password("{noop}password123")
                .roles("USER").build();

        return new InMemoryUserDetailsManager(james, kayla);
    }
}
