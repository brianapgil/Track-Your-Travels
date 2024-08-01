DROP DATABASE IF EXISTS travelblog_db;
CREATE DATABASE travelblog_db;

\c travelblog_db

CREATE TABLE IF NOT EXISTS user_db (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS entry (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    user_id INTEGER REFERENCES user_db(id) ON DELETE CASCADE
);