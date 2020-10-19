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
        connection.end();
        process.exit();
    }
  })
};

// Helper Functions for Results of User Actions

// Function | View All Departments
function viewDepts() {
  let request = "SELECT * FROM department";
  connection.query(request, function(err, res) {
    if (err) throw err;
    console.log("Viewing All Departments");
    console.table(res);
    beginPrompts();
  })
};

// Function | View All Roles
function viewRoles() {
  let request = "SELECT * FROM role";
  connection.query(request, function(err, res) {
    if (err) throw err;
    console.log("Viewing All Roles");
    console.table(res);
    beginPrompts();
  })
};

// Function | View All Employees
function viewEmployees() {
  let request = "SELECT * FROM employee";
  connection.query(request, function(err, res) {
    if (err) throw err;
    console.log("Viewing All Employees");
    console.table(res);
    beginPrompts();
  })
};

// Function | Add a Department
function addDept() {
  // User Prompts
  inquirer.prompt ({
    type: "input",
    message: "Please enter the department name:",
    name: "newDeptName"
  }).then(function(answer) {
    // Insert into Database
    connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDeptName], function(err, res) {
      if (err) throw err;
      console.table(res)
      console.log("Department Added");
      beginPrompts();
    })
  })
};

// Function | Add a Role
function addRole() {
  // User prompts
  inquirer.prompt ([
    {
      type: "input",
      message: "Please enter the name of the new role:",
      name: "newRoleName"
    },
    {
      type: "input",
      message: "Please enter the salary amount for the new role:",
      name: "newRoleSalary"
    },
    {
      type: "input",
      message: "Please enter the department ID for the new role:",
      name: "newDeptId"
    }
  ])
  .then(function(answer) {
    // Insert into Database
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
    [answer.newRoleName, answer.newRoleSalary, answer.newDeptId], function(err, res) {
      if (err) throw err;
      console.table(res);
      console.log("Role Added!");
      beginPrompts();
    }
  )})
};

// Function | Add an Employee
function addEmployee() {
  // User Prompts
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter the employee's first name:",
      name: "newFirstName"
    },
    {
      type: "input",
      message: "Please enter the employee's last name:",
      name: "newLastName"
    },
    {
      type: "input",
      message: "Please enter the employee's role ID number:",
      name: "newRoleId"
    },
    {
      type: "input",
      message: "Please enter the manager's ID number:",
      name: "newManagerId"
    }
  ])
  .then(function(answer) {
    // Insert into Database
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
    [answer.newFirstName, answer.newLastName, answer.newRoleId, answer.newManagerId]), function(err, res) {
      if (err) throw err;
      console.table(res);
      console.log("Employee Added!");
      beginPrompts();
    }
  })
};

// Function | Update Employee Role
function updateRole() {
  // User Prompts
  inquirer.prompt ({
    name: "employeeId",
    type: "input",
    message: "Please enter the ID of the employee you wish to update:"
  })
  .then(function(answer) {
    let employeeId = answer.employeeId;
    inquirer.prompt({
      name: "newRoleId",
      type: "input",
      message: "Please enter the new role ID for this employee:"
    })
    .then(function(answer) {
      // Update employee record
      let newRoleId = answer.newRoleId;
      let request = "UPDATE employee SET role_id=? WHERE id=?";
      connection.query(request, [newRoleId, employeeId], function(err, res) {
        if(err) throw err;
        console.table(res);
        console.log("Employee Role Updated!");
        beginPrompts();
      })
    })
  })
};
