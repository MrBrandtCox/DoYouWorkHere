const mysql = require("mysql2");
const inquirer = require("inquirer"); //Tables show in terminal but I am getting an error message, maybe delete things from package.json & lock

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root",
    password: "root", 
    database: "employees_db",
});

function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments", 
            "View all roles", 
            "View all employees", 
            "Add a department", 
            "Add a role", 
            "Add an employee", 
            "Update employee role", 
            "Exit",
        ],
    })
    .then(function (answer) {
        switch (answer.action) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployeeRole();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                break;
        }
    });
}

const viewDepartments = () => {

    let query = "SELECT * FROM department";

    connection.query(query, function(err, res) {
        if (err) throw(err);
        console.log(res);
    })
}

start();
