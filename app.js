const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');
const { isAsyncFunction } = require('util/types');
const { start } = require('repl');

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

console.table (
    "EMPLOYEE TRACKER"
)

const startDatabase = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do? (Required)',
            choice: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role',
                'Exit Application'
            ]
        });
        switch (answer.action) {
            case 'View All Department':
                departmentView();
                break;

            case 'View All Roles':
                roleView();
                break;

            case "View All Employees":
                employeeView();
                break;

            case "Add An Employee":
                employeeAdd();
                break;

            case "Add A Department":
                departmentAdd();
                break;
            
            case "Add A Role":
                roleAdd();
                break;

            case "Update An Employee Role":
                employeeUpdate();
                break;

            case "Exit":
                connection.end;
                break;
        };
    } catch (err) {
        console.log(err);
        startDatabase();
    }
};
//view all departments
const departmentView = async () => {
    console.log('Department View');
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
    }
};

//view all roles 
const roleView = async () => {
    console.log('Role View');
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
    }
};

//view all employees
const employeeView = async () => {
    console.log('Employee View');
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
    }
};

// add a department

const employeeAdd = async () => {
    console.log("Add Employee");
    try {
        let roles = await connection.query("SELECT * FROM role");
        let managers = await connection.query('SELECT * FROM employee')
        let answer = await inquirer.prompt ([
            {
                name: 'firstName',
                type: 'input',
                message: "What is the employee's first name? (Required)"
            },
            {
                name: 'lastName',
                type: 'input',
                message: "What is the employee's last name? (Required)"
            },
            {
                name: 'roleId',
                type: 'input',
                message: "What is the employee's role ID? (Required)"
            },
            {
                name: 'managerId',
                type: 'input',
                message: "What is the employee's manager's ID?"
            }
        ])

        let result = await connection.query("INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: (answer.roleId),
            manager_id: (answer.managerId)
        });

        console.log(`${answer.firstName} ${answer.lastName} has been added to the tracker.`);
        startDatabase();

    }   catch (err) {
        console.log(err);
        startDatabase();
    };
};