DROP DATABASE IF EXISTS employee_db;
-- Creates the "employee_db" database --
CREATE DATABASE employee_db;
-- Use "employee_db" so that the following code effects "employee_db" --
USE employee_db;


CREATE TABLE departments (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(35),
    PRIMARY KEY (id)
);


CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30),
    salary DECIMAL (10,2),
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (id)
    ON DELETE CASCADE
);

-- Create table allEmployees inside of "employeeManager_db" --
CREATE TABLE allemployees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id)
    ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES allemployees (id)
    ON DELETE CASCADE
);