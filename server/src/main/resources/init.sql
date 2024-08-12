DROP USER IF EXISTS 'spotme'@'localhost';

CREATE USER 'spotme'@'localhost' IDENTIFIED BY 'dinero';

CREATE DATABASE IF NOT EXISTS `spotme-dev`;

GRANT ALL PRIVILEGES ON `spotme-dev`.* TO 'spotme'@'localhost';

DROP TABLE IF EXISTS `role`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(68) NOT NULL,
    enabled TINYINT NOT NULL,
    balance NUMERIC(6,2),

    PRIMARY KEY (`username`),
    KEY `id_idx` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1; 

CREATE TABLE `role` (
    username VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL,
    UNIQUE KEY `role_idx_1` (`username`, `role`),
    CONSTRAINT `role_fk_1` FOREIGN KEY (`username`) REFERENCES `user`(`username`) 
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `user`(username,password,enabled,balance) VALUES ("kayla","{noop}fun123",1,1000.00), ("james","{noop}test123",1,1000.00);
INSERT INTO `role` (username,role) VALUES ("kayla","ROLE_USER"), ("james","ROLE_USER");
