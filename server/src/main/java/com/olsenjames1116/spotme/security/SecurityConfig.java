package com.olsenjames1116.spotme.security;

import com.olsenjames1116.spotme.service.CustomUserDetailsService;
import com.olsenjames1116.spotme.security.JwtUtil;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

        @Autowired
        private CustomUserDetailsService customUserDetailsService;

        @Autowired
        private JwtUtil jwtUtil;

        @Bean
        public UserDetailsManager userDetailsManager(DataSource dataSource) {
                JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);

                userDetailsManager.setUsersByUsernameQuery(
                                "SELECT username, password, enabled FROM user WHERE username=?");
                userDetailsManager.setAuthoritiesByUsernameQuery(
                                "SELECT username, role FROM role WHERE username=?");

                return userDetailsManager;
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public AuthenticationManager authenticationManager(
                        AuthenticationConfiguration authenticationConfiguration) throws Exception {
                return authenticationConfiguration.getAuthenticationManager();
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(requests -> requests
                                                .requestMatchers("/api/register", "/api/login")
                                                .permitAll().anyRequest().authenticated())
                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS));

                http.addFilterBefore(jwtRequestFilter(),
                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public JwtRequestFilter jwtRequestFilter() {
                return new JwtRequestFilter(jwtUtil, customUserDetailsService);
        }
}



// import static org.springframework.security.config.Customizer.withDefaults;

// import javax.sql.DataSource;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.provisioning.JdbcUserDetailsManager;
// import org.springframework.security.provisioning.UserDetailsManager;
// import org.springframework.security.web.SecurityFilterChain;


// @Configuration
// public class SecurityConfig {
// @Bean
// public UserDetailsManager userDetailsManager(DataSource dataSource) {
// JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);

// userDetailsManager.setUsersByUsernameQuery(
// "SELECT username, password, enabled FROM user WHERE username=?");
// userDetailsManager
// .setAuthoritiesByUsernameQuery("SELECT username, role FROM role WHERE username=?");

// return userDetailsManager;
// }

// @Bean
// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// http.csrf(csrf -> csrf.disable())
// .authorizeHttpRequests(configurer -> configurer.requestMatchers("/api/test")
// .hasRole("USER").requestMatchers("/users").permitAll())
// .httpBasic(withDefaults());

// return http.build();
// }


// }
