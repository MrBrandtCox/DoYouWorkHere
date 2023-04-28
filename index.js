const mysql = require("mysql2");
const inquirer = require("inquirer"); //Tables show in terminal but I am getting an error message, maybe delete things from package.json & lock
// I'm unable to use my tables in terminal until error is fixed..
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
        console.table(res);
        start();
    });
};

const viewRole = () => {
    let query = "SELECT role.title, role.salary, role.id, department.name FROM role RIGHT JOIN department ON role.department_id = department.id ";

    connection.query(query, function(err, res) {
        if (err) throw(err);
        console.table(res);
        start();
    });
};

const viewEmployees = () => {
    //let query = "SELECT first_name, last_name, id, manager_id, FROM employee ORDER BY last_name "; This gives the manager id
    // Query below gives the manager name
    let query = "SELECT t1.first_name, t1.last_name, CONCAT(t2.first_name,' ', t2.last_name) AS manager FROM employee t1 INNER JOIN employee t2 ON t1.manager_id = t2.id ";

    connection.query(query, function(err, res) {
        if (err) throw(err);
        console.table(res);
        start();
    });
};

// ADD A DEPARTMENT
// ADD A ROLE

const addEmployee = () => {
connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw (err);
    inquirer.prompt([
        {
        name: "firstName",
        type: "input",
        message: "First name?"
        },
        {
        name: "lastName",
        type: "input",
        message: "Last name?"
        },
        {
        name: "managerId",
        type: "input",
        message: "Manager ID?"
        },
        {
        name: "addRole",
        type: "list",
        choices: function () {
            return res.map((role) => ({ name: role.title, value: role.id }))
        },
        message: "Role?",
        },
    ]).then( function (answer) {
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            manager_id: answer.managerId,
            role_id: answer.addRole,
        }),
            start();
    });
});

}; //The parenting looks suspicious here.

const updateEmployeeRole = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        inquirer.prompt ([
            {
                name: "employeeId",
                type: "input",
                message: "Employee Id?"
            },
            {
                name: "updatedRole",
                type: "list",
                choices: function () {
                    return res.map((role) => ({name: role.title, value: role.id}));
                },
                message: "Role?",
            }
        ]).then( function (answer) {
            console.log(answer.updatedRole);
            connection.query("UPDATE employee SET ? WHERE ?",[
                    {role_id: answer.updatedRole}, 
                    {id: answer.employeeId},
            ]);
            start();
        });
    });
};

start();
