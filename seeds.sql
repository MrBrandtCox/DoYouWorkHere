USE employees_db;

INSERT INTO department (name) VALUES
("Information Systems and Technology"),
("Finance"),
("Legal"),
("Human Resources"),
("Security"),
("Sales");

INSERT INTO role (title, salary, department_id) VALUES
("Web Developer", 90000, 1),
("Accountant", 70000, 2),
("Paralegal", 50000, 3),
("Manager", 70000, 4),
("Engineer", 90000, 5),
("Sales Rep", 40000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("John", "Smith", 1, 6),
("Ronald", "Young", 2, 5),
("David", "Miller", 2, 4), 
("Maria", "Hall", 4, 3),
("Linda", "Martin", 5, 2),
("Taylor", "Wilson", 6, 1);