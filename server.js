// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'root',
        database: 'employee_db'
    },
    console.log(`Connected to the classlist_db database.`)
);

const Actions = {
    VIEW_EMPLOYEES: "View Employees",
    VIEW_DEPARTMENTS: "View Departments",
    VIEW_ROLES: "View Roles",
    ADD_DEPARTMENT: "Add a Department",
    ADD_ROLE: "Add a Role",
    ADD_EMPLOYEE: "Add an Employee",
    UPDATE_EMPLOYEE: "Update an Employee",
    EXIT: "Exit",
};

const init = async () => {
    let exitRequested = false;
    while (!exitRequested) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: Object.values(Actions),
        })

        if (action === Actions.VIEW_EMPLOYEES) {
            try {
                db.query('SELECT * FROM allemployees LEFT JOIN roles ON roles.id = allemployees.id', function (err, results) {
                    console.log('All Employees');
                    console.table(results);
                    init();
                });
            } catch {
                console.log(err);
            }
        }

        if (action === Actions.VIEW_DEPARTMENTS) {
            try {
                db.query('SELECT * FROM departments', function (err, results) {
                    console.log('All Departments');
                    console.table(results);
                    init();
                });
            } catch {
                console.log(err);
            }
        }

        if (action === Actions.VIEW_ROLES) {
            try {
                db.query('SELECT * FROM roles', function (err, results) {
                    console.log('All Roles');
                    console.table(results);
                    init();
                });
            } catch {
                console.log(err);
            }
        }

        if (action === Actions.ADD_DEPARTMENT) {
            try {
                const addDepartment = await inquirer.prompt(
                    {
                        type: 'input',
                        name: 'addDepartment',
                        message: 'What is the name of the department you would like to add?'
                    }
                )

            } catch {
                console.log(err);
            }
        }

        if (action === Actions.ADD_ROLE) {
            try {
                const addRole = await inquirer.prompt(
                    {
                        type: 'input',
                        name: 'role_name',
                        message: 'What is the name of the role you would like to add?'
                    },
                    {
                        type: 'number',
                        name: 'role_salary',
                        message: 'What is the salary of the role you are adding?'

                    },
                    {
                        type: 'number',
                        name: 'department_id',
                        message: 'Please enter the department id of the role you are adding.'
                    }
                )

            } catch {
                console.log(err);
            }
        }

        if (action === Actions.ADD_EMPLOYEE) {
            try {
                const addEmployee = await inquirer.prompt(
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Please enter the first name of the employee you are adding.'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Please enter the last name of the employee you are adding.'
                    },
                    {
                        type: 'number',
                        name: 'role_id',
                        message: 'Please enter the role id of the employee you are adding'
                    },
                    {
                        type: 'input',
                        name: 'manager_id',
                        message: 'Please enter the corresponding manager id for the new employee, use NULL if N/A'
                    }
                )
            } catch {
                console.log(err);
            }
        }

        if (action === Actions.UPDATE_EMPLOYEE) {
            try {

            } catch {
                console.log(err);
            }
        }

        if (action === Actions.EXIT) {
            exitRequested = true;
            console.log('Bye!');
        }
    };
};


init();