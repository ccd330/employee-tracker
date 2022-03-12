INSERT INTO department (name)
VALUES
('accounting')
('sales')
('marketing')
('operations')

INSERT INTO role (title, salary, department_id)
VALUES
('assistant accountant', '60,000', '1'),
('accountant', '80,000', '1'),
('salesperson', '70,000', '2'),
('senior salesperson', '100,000', '2'),
('marketing coordinator', '60,000', '3')
('marketing manager', '90,000', '3'),
('operations coordinator', '75,000', '4'),
('logistics manager', '100,000', '4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tony', 'Stark', '4'),
('Steve', 'Rogers', '2'),
('Bruce', 'Banner', '1'),
('Natasha', 'Romanoff', '3'),
('Clint', 'Barton', '1'),
('Phil', 'Coulson', '4'),
('Maria', 'Hill', '2'),
('Nick', 'Fury', '3');