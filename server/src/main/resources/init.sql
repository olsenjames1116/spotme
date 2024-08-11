DROP USER IF EXISTS 'spotme'@'localhost';

CREATE USER 'spotme'@'localhost' IDENTIFIED BY 'dinero';

CREATE DATABASE IF NOT EXISTS `spotme-dev`;

GRANT ALL PRIVILEGES ON `spotme-dev`.* TO 'spotme'@'localhost';

DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `role`;

CREATE TABLE `user` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(68) NOT NULL,
    enabled TINYINT NOT NULL,
    balance NUMERIC(6,2)
);

CREATE TABLE `role` (
    user_id INT NOT NULL,
    role VARCHAR(50) NOT NULL,
    UNIQUE KEY `role_idx_1` (`user_id`, `role`),
    CONSTRAINT `role_fk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) 
);