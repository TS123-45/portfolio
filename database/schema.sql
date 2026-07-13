CREATE DATABASE portfolio_db;
USE portfolio_db;

CREATE TABLE personal_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    profession VARCHAR(100) NOT NULL,
    career_objective TEXT,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    location VARCHAR(100),
    github VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

## 2. Education
CREATE TABLE education (
    id INT PRIMARY KEY AUTO_INCREMENT,
    degree VARCHAR(150),
    institution VARCHAR(200),
    university VARCHAR(150),
    location VARCHAR(150),
    start_year YEAR,
    end_year YEAR,
    percentage_or_cgpa VARCHAR(20),
    description TEXT
);

CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(100),
    skill_name VARCHAR(100)
);

## 4. Projects
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200),
    project_type ENUM('Internship','Academic'),
    description TEXT,
    technologies TEXT,
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## 5. Project Features
CREATE TABLE project_features (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    feature TEXT,
    FOREIGN KEY (project_id)
    REFERENCES projects(id)
    ON DELETE CASCADE
);

CREATE TABLE certifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200),
    organization VARCHAR(150),
    issue_date DATE,
    description TEXT
);

CREATE TABLE experience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(150),
    role VARCHAR(150),
    start_date DATE,
    end_date DATE,
    description TEXT
);

## 8. Social Links
CREATE TABLE social_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    platform VARCHAR(50),
    url VARCHAR(255)
);


CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);