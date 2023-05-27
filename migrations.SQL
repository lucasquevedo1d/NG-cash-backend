Active: 1665769422310@@127.0.0.1@3306

CREATE TABLE Account (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    balance int default 10
);

CREATE TABLE User10 (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    username VARCHAR(255) not NULL,
    password varchar(255) not null,
    accountId varchar(255) not null, 
    FOREIGN KEY(accountId) REFERENCES Account(id),

);

CREATE TABLE Transactions (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    debitAccountId VARCHAR(255) NOT NULL,
    creditAccountId VARCHAR(255) NOT NULL,
    FOREIGN KEY(debitAccountId) REFERENCES Account(id),
    FOREIGN KEY(creditAccountId) REFERENCES Account(id)
)