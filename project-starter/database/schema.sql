-- Project starter schema. Replace items with your own ER design (≥ 5 tables, PK/FK).
CREATE DATABASE IF NOT EXISTS project_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE project_db;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS items, user, privilege;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE privilege (
  id    INT PRIMARY KEY,
  value VARCHAR(50) NOT NULL UNIQUE
);
INSERT INTO privilege VALUES (1, 'member'), (2, 'admin');

CREATE TABLE user (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  username     VARCHAR(100) NOT NULL UNIQUE,
  password     VARCHAR(100) NOT NULL,          -- bcrypt hash
  privilege_id INT NOT NULL DEFAULT 1,
  active       BOOLEAN NOT NULL DEFAULT TRUE,
  consent_at   DATETIME NULL,                  -- PDPA
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (privilege_id) REFERENCES privilege(id)
);
-- fake admin, password: admin12345
INSERT INTO user (username, password, privilege_id, consent_at)
VALUES ('admin', '$2b$12$/Bb3uoEPcNvheF4t3meHkeI4.Liw6GIqt33po0oOYNNrbjibgchyq', 2, NOW());

CREATE TABLE items (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  name       VARCHAR(100) NOT NULL,
  price      DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id)
);
INSERT INTO items (user_id, name, price) VALUES (1, 'Notebook', 35), (1, 'Pen', 12.5), (1, 'Bag', 590);
