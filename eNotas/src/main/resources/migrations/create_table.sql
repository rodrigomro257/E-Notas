--liquibase formatted sql

--changeset rodrigo:4
CREATE TABLE enotas(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    text VARCHAR(100) NOT NULL,
    data VARCHAR(10) NOT NULL
);
