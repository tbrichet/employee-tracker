// Connect MySQL
const mysql = require('mysql2');

// Connect Inquirer
const inquirer = require('inquirer');

// Connect Console Table
const cTable = require('console.table');
 
// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employees',
  password: 'password',
});

// Error message if connection issues
connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to Employee Tracker!');
    beginPrompts();
});

// User Inquirer for User Prompts

function beginPrompts() {
  inquirer.prompt (
    {
      name: "options",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Quit Program"
      ]

    }
  )
  .then((answer) => {
    // Switch between functions depending on user selection
    switch (answer.options) {
      case "View All Departments":
        viewDepts();
        break;

      case "View All Roles":
        viewRoles();
        break;

      case "View All Employees":
        viewEmployees();
        break;
      
      case "Add a Department":
        addDept();
        break;
      
      case "Add a Role":
        addRole();
        break;
      
      case "Add an Employee":
        addEmployee();
        break;
      
      case "Update an Employee Role":
        updateRole();
        break;
      
      case "Quit Program":
        console.log("Thank You, Come Again!");
        break;
    }
  })
};

// Helper Functions for Results of User Actions

// Function | View All Departments
function viewDepts() {
  console.log("Viewing All Departments");
};

// Function | View All Departments
function viewRoles() {
  console.log("Viewing All Roles");
};

// Function | View All Employees
function viewEmployees() {
  console.log("Viewing All Employees");
};

// Function | Add a Department
function addDept() {
  console.log("Adding a Department");
};

// Function | Add a Role
function addRole() {
  console.log("Adding a Role");
};

// Function | Add an Employee
function addEmployee() {
  console.log("Adding an Employee");
};

// Function | Update Employee Role
function updateRole() {
  console.log("Updating an Employee Role");
};
