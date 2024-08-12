package com.olsenjames1116.spotme.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.olsenjames1116.spotme.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
