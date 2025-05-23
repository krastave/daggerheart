-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Characters Table
CREATE TABLE IF NOT EXISTS characters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  heritage VARCHAR(50) NOT NULL,
  calling VARCHAR(50) NOT NULL,
  level INT DEFAULT 1,
  experience INT DEFAULT 0,
  biography TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Character Stats Table
CREATE TABLE IF NOT EXISTS character_stats (
  character_id INT PRIMARY KEY,
  strength INT DEFAULT 10,
  dexterity INT DEFAULT 10,
  constitution INT DEFAULT 10,
  intelligence INT DEFAULT 10,
  wisdom INT DEFAULT 10,
  charisma INT DEFAULT 10,
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

-- Create Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  character_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  modifier VARCHAR(20),
  is_proficient BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

-- Create Abilities Table
CREATE TABLE IF NOT EXISTS abilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  character_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  source VARCHAR(100),
  usage_type ENUM('passive', 'active') DEFAULT 'passive',
  uses_per_day INT,
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

-- Create Inventory Items Table
CREATE TABLE IF NOT EXISTS inventory_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  character_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  quantity INT DEFAULT 1,
  weight DECIMAL(8,2) DEFAULT 0,
  value DECIMAL(10,2) DEFAULT 0,
  category ENUM('weapon', 'armor', 'equipment', 'consumable', 'treasure') DEFAULT 'equipment',
  is_equipped BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

-- Create an admin user
-- Default password: 'admin123' (should be changed in production)
INSERT INTO users (username, email, password, role)
VALUES ('admin', 'admin@example.com', '$2a$10$OYX3lNfqN1pEk11V9cHRu.GHmCiuIuUOBN1mQcOxYI5cY7oz88jVm', 'admin')
ON DUPLICATE KEY UPDATE username = 'admin';