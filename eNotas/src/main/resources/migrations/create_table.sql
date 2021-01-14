--liquibase formatted sql

--changeset rodrigo:7
CREATE TABLE enotas(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(30) NOT NULL,
    texto VARCHAR(100) NOT NULL,
    data TIMESTAMPTZ NOT NULL
);
