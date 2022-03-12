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

            case "Add A Department":
                departmentAdd();
                break;
            
            case "Add A Role":
                roleAdd();
                break;
            
            case "Add An Employee":
                employeeAdd();
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
}