-- Schema definition for Sanjay Ashwin Portfolio Database
-- Target: MySQL 8.0+

CREATE DATABASE IF NOT EXISTS sanjay_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sanjay_portfolio;

CREATE TABLE IF NOT EXISTS admin_users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_ADMIN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    title VARCHAR(200) NOT NULL,
    bio TEXT NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    resume_url VARCHAR(255),
    cgpa VARCHAR(20),
    education_summary VARCHAR(255),
    avatar_url LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(50) DEFAULT 'Proficient',
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    project_year VARCHAR(20) NOT NULL,
    tagline VARCHAR(255),
    description TEXT NOT NULL,
    technologies VARCHAR(500) NOT NULL,
    features TEXT,
    github_url VARCHAR(255),
    live_demo_url VARCHAR(255),
    image_url VARCHAR(255),
    featured BOOLEAN DEFAULT TRUE,
    problem_statement TEXT,
    solution_statement TEXT,
    architecture_notes TEXT,
    contributions TEXT,
    future_improvements TEXT,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(200) NOT NULL,
    role VARCHAR(150) NOT NULL,
    location VARCHAR(100),
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT NOT NULL,
    technologies VARCHAR(500),
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(200) NOT NULL,
    field_of_study VARCHAR(200),
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    cgpa VARCHAR(20),
    location VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    issuer VARCHAR(200) NOT NULL,
    issue_date VARCHAR(50),
    credential_url VARCHAR(255),
    credential_id VARCHAR(100),
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(250) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT
);
