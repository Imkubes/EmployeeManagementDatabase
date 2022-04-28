USE employee_db;

INSERT INTO departments (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (job_title,salary,department_id)
VALUES
    ('Sales Lead', 50000,1),
    ('Salesman', 45000,1),
    ('Lead Engineer', 75000,2),
    ('Software Engineer', 65000,2),
    ('Account Manager', 50000,3),
    ('Lawyer', 200000,4);


INSERT INTO allemployees (first_name,last_name,role_id,manager_id)
VALUES
    ('Bob','Swaggerty',3,NULL),
    ('Wilson','Zero',4,1),
    ('John','Doe',2,2),
    ('James','Bond',4,3);