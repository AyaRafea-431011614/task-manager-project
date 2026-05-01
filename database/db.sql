CREATE DATABASE IF NOT EXISTS student_task_manager;
USE student_task_manager;

CREATE TABLE IF NOT EXISTS users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'admin') DEFAULT 'student',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  group_name VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
);

CREATE TABLE IF NOT EXISTS tasks (
  id INT(11) NOT NULL AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT DEFAULT NULL,
  deadline DATE DEFAULT NULL,
  status ENUM('pending', 'done') DEFAULT 'pending',
  assigned_to INT(11) DEFAULT NULL,
  created_by INT(11) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  group_name VARCHAR(50) DEFAULT NULL,
  task_type ENUM('personal', 'group') DEFAULT 'personal',
  PRIMARY KEY (id),
  KEY assigned_to (assigned_to),
  KEY created_by (created_by),
  CONSTRAINT tasks_ibfk_1 FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT tasks_ibfk_2 FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);