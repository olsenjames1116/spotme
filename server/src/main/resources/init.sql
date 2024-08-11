DROP USER IF EXISTS 'spotme'@'localhost';

CREATE USER 'spotme'@'localhost' IDENTIFIED BY 'dinero';

CREATE DATABASE IF NOT EXISTS `spotme-dev`;

GRANT ALL PRIVILEGES ON `spotme-dev`.* TO 'spotme'@'localhost';