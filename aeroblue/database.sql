-- AeroBlue Database Setup
-- Import this in phpMyAdmin

CREATE DATABASE IF NOT EXISTS aeroblue CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE aeroblue;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_date VARCHAR(50) NOT NULL,
    return_date VARCHAR(50),
    passengers INT NOT NULL DEFAULT 1,
    trip_type VARCHAR(20) NOT NULL DEFAULT 'return',
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'confirmed',
    booked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
