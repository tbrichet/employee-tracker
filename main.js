// get the client
const mysql = require('mysql2');

// Inquirer
const inquirer = require('inquirer');

// Connect database
const db = require('./db/database');

// Console Table
const cTable = require('console.table');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

// Db Constant
//const db = 