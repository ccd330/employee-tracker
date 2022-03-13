// List the dependencies here.
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');
 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_DB'
});

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
    if (err) throw err;
    startDatabase();
})

console.table(
    "--- EMPLOYEE TRACKER ---"
)

const startDatabase = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View Employees':
                viewEmployee();
                break;

            case 'View Departments':
                viewDepartment();
                break;

            case 'View Roles':
                viewRole();
                break;

            case 'Add Employees':
                addEmployee();
                break

            case 'Add Departments':
                addDepartment();
                break

            case 'Add Roles':
                addRole();
                break

            case 'Update Employee':
                updateEmployee();
                break

            case 'Exit':
                connection.end();
                break;
        };
    } catch (err) {
        console.log(err);
        startDatabase();
    };
}

// view employees
const viewEmployee = async () => {
    console.log('View Employees');
    try {
        let query = 'SELECT * FROM employee';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let employeeArray = [];
            res.forEach(employee => employeeArray.push(employee));
            console.table(employeeArray);
            startDatabase();
        });
    } catch (err) {
        console.log(err);
        startDatabase();
    };
}

// view departments
const viewDepartment = async () => {
    console.log('View Departments');
    try {
        let query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let departmentArray = [];
            res.forEach(department => departmentArray.push(department));
            console.table(departmentArray);
            startDatabase();
        });
    } catch (err) {
        console.log(err);
        startDatabase();
    };
}

// view roles
const viewRole = async () => {
    console.log('View Role');
    try {
        let query = 'SELECT * FROM role';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let roleArray = [];
            res.forEach(role => roleArray.push(role));
            console.table(roleArray);
            startDatabase();
        });
    } catch (err) {
        console.log(err);
        startDatabase();
    };
}

// add employee
const addEmployee = async () => {
    try {
        console.log('Add Employee');

        let roles = await connection.query("SELECT * FROM role");

        let managers = await connection.query("SELECT * FROM employee");

        let answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the employee first name?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the employee last name?'
            },
            {
                name: 'employeeRoleId',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: "What is the employee role id?"
            },
            {
                name: 'employeeManagerId',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: "What is this employee's manager id?"
            }
        ])

        let result = await connection.query("INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: (answer.employeeRoleId),
            manager_id: (answer.employeeManagerId)
        });

        console.log(`${answer.firstName} ${answer.lastName} has been added to the tracker.`);
        startDatabase();

    } catch (err) {
        console.log(err);
        startDatabase();
    };
}

// add department
const addDepartment = async () => {
    try {
        console.log('Add Department');

        let answer = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of the new department?'
            }
        ]);

        let result = await connection.query("INSERT INTO department SET ?", {
            department_name: answer.deptName
        });

        console.log(`${answer.deptName} department has been added to the tracker.`)
        startDatabase();

    } catch (err) {
        console.log(err);
        startDatabase();
    };
}

// add role
const addRole = async () => {
    try {
        console.log('Add Role');

        let departments = await connection.query("SELECT * FROM department")

        let answer = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of the new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the role salary?'
            },
            {
                name: 'departmentId',
                type: 'list',
                choices: departments.map((departmentId) => {
                    return {
                        name: departmentId.department_name,
                        value: departmentId.id
                    }
                }),
                message: 'What department id is this role associated with?',
            }
        ]);
        
        let departmentChoice;
        for (i = 0; i < departments.length; i++) {
            if(departments[i].department_id === answer.choice) {
                departmentChoice = departments[i];
            };
        }
        let result = await connection.query("INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
        })

        console.log(`The ${answer.title} role has been added to the tracker.`)
        startDatabase();

    } catch (err) {
        console.log(err);
        startDatabase();
    };
}

// update employee
const updateEmployee = async () => {
    try {
        console.log('Update Employee');
        
        let employees = await connection.query("SELECT * FROM employee");

        let employeeChoice = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                }),
                message: 'Please choose an employee to update.'
            }
        ]);

        let roles = await connection.query("SELECT * FROM role");

        let roleChoice = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: 'Please select the role to update the employee with.'
            }
        ]);

        let result = await connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleChoice.role }, { id: employeeChoice.employee }]);

        console.log(`The role was updated.`);
        startDatabase();

    } catch (err) {
        console.log(err);
        startDatabase();
    };
}
   