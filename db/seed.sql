USE employees;

INSERT INTO department (name)
VALUES
    ("Engineering"),
    ("Human Resources"),
    ("Consulting"),
    ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Computer Programmer", 50000, 1),
    ("Customer Support", 40000, 2),
    ("Consultant", 80000, 3),
    ("VP", 100000, 4);
    

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Bill", "Lumbergh", 4, null),
    ("Peter", "Gibbons", 1, 1),
    ("Michael", "Bolton", 1, 1),
    ("Samir", "Nagheenanajar", 1, 1),
    ("Bob", "Slydell", 3, null),
    ("Bob", "Porter", 3, null),
    ("Milton", "Waddams", 1, 1),
    ("Tom", "Smykowski", 2, 1);