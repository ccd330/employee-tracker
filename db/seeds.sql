INSERT INTO department (department_name)
VALUES ('accounting')
INSERT INTO department (department_name)
VALUES ('sales')
INSERT INTO department (department_name)
VALUES ('marketing')
INSERT INTO department (department_name)
VALUES ('operations')

INSERT INTO role (title, salary, department_id)
VALUES ('assistant accountant', '60,000', '1'),
INSERT INTO role (title, salary, department_id)
VALUES ('accountant', '80,000', '1'),
INSERT INTO role (title, salary, department_id)
VALUES ('salesperson', '70,000', '2'),
INSERT INTO role (title, salary, department_id)
VALUES ('senior salesperson', '100,000', '2'),
INSERT INTO role (title, salary, department_id)
VALUES ('marketing coordinator', '60,000', '3')
INSERT INTO role (title, salary, department_id)
VALUES ('marketing manager', '90,000', '3'),
INSERT INTO role (title, salary, department_id)
VALUES ('operations coordinator', '75,000', '4'),
INSERT INTO role (title, salary, department_id)
VALUES ('logistics manager', '100,000', '4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tony', 'Stark', '4', '6'),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Steve', 'Rogers', '2', '7'),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bruce', 'Banner', '1', '5'),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Natasha', 'Romanoff', '3', '8'),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Clint', 'Barton', '1', null),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Phil', 'Coulson', '4', null),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Maria', 'Hill', '2', null),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nick', 'Fury', '3', null);


