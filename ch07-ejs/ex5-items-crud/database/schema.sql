-- CH7 · The items table  (your project uses your own ER design, ≥ 5 tables)
CREATE DATABASE IF NOT EXISTS webtech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE webtech;

DROP TABLE IF EXISTS items;
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO items (name, price)
VALUES ('Notebook', 35.00), ('Pen', 12.50);
