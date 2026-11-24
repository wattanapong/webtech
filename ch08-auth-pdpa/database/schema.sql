-- CH8 · Authentication, authorization & PDPA
-- Run once:  mysql -u root -p < database/schema.sql   (or HeidiSQL → Run SQL file)
CREATE DATABASE IF NOT EXISTS webtech_auth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE webtech_auth;

DROP TABLE IF EXISTS user, privilege, member_plain;

-- Ex1 only: the WRONG way (plain-text passwords) – used to show what is wrong
CREATE TABLE member_plain (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL          -- ❌ plain text
);
INSERT INTO member_plain (username, password) VALUES ('test', 'test'), ('john', '1234');

-- Ex2 / Ex3: the right way
CREATE TABLE privilege (
  id    INT PRIMARY KEY,
  value VARCHAR(50) NOT NULL UNIQUE      -- 'member', 'admin'
);
INSERT INTO privilege VALUES (1, 'member'), (2, 'admin');

CREATE TABLE user (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  username     VARCHAR(100) NOT NULL UNIQUE,
  password     VARCHAR(100) NOT NULL,     -- bcrypt hash (60 chars)
  privilege_id INT NOT NULL DEFAULT 1,
  active       BOOLEAN NOT NULL DEFAULT TRUE,
  consent_at   DATETIME NULL,             -- PDPA consent time
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (privilege_id) REFERENCES privilege(id)
);

-- fake test admin (password: admin12345) – never put real people in a demo database
INSERT INTO user (username, password, privilege_id, consent_at)
VALUES ('admin', '$2b$12$/Bb3uoEPcNvheF4t3meHkeI4.Liw6GIqt33po0oOYNNrbjibgchyq', 2, NOW());

-- the "sessions" table is created automatically by express-mysql-session
