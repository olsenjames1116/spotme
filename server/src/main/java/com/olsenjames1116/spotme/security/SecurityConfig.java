package com.olsenjames1116.spotme.security;

import com.olsenjames1116.spotme.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
        private UserService userService;
        private JwtUtil jwtUtil;

        public SecurityConfig(@Lazy UserService userService, JwtUtil jwtUtil) {
                this.userService = userService;
                this.jwtUtil = jwtUtil;
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        // Configure the AuthenticationManager bean
        @Bean
        public AuthenticationManager authenticationManager(
                        AuthenticationConfiguration authenticationConfiguration) throws Exception {
                return authenticationConfiguration.getAuthenticationManager();
        }

        // Configure the SecurityFilterChain bean
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                // Disable CSRF protection
                http.csrf(csrf -> csrf.disable())
                                // Allow access to "/auth/register" and "/auth/login" without
                                // authentication
                                .authorizeHttpRequests(requests -> requests
                                                .requestMatchers("/auth/register", "/auth/login")
                                                .permitAll().anyRequest().authenticated())
                                // Set session creation policy to STATELESS
                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS));

                // Add JwtRequestFilter before UsernamePasswordAuthenticationFilter
                http.addFilterBefore(jwtRequestFilter(),
                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        // Create and configure the JwtRequestFilter bean
        @Bean
        public JwtRequestFilter jwtRequestFilter() {
                return new JwtRequestFilter(jwtUtil, userService);
        }
}
