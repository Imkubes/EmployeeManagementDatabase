// Import and require mysql2
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
    try {
        // Connect to database
        let db = await mysql.createConnection(
            {
                host: 'localhost',
                // MySQL username,
                user: 'root',
                // MySQL password
                password: 'root',
                database: 'employee_db',
            },
        );
        console.log(`Connected to the employee_db database.`)

        let exitRequested = false;
        while (!exitRequested) {
            const { action } = await inquirer.prompt({
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: Object.values(Actions),
            })

            switch (action) {
                case Actions.VIEW_EMPLOYEES: {
                    const [employees] = await db.query('SELECT * FROM allemployees LEFT JOIN roles ON roles.id = allemployees.id');
                    console.log('All Employees');
                    console.table(employees);
                    break;
                }
                case Actions.VIEW_DEPARTMENTS: {
                    const [departments] = await db.query('SELECT * FROM departments');
                    console.log('All Departments');
                    console.table(departments);
                    break;
                }
                case Actions.VIEW_ROLES: {
                    const [roles] = await db.query('SELECT * FROM roles');
                    console.log('All Roles');
                    console.table(roles);
                    break;
                }
                case Actions.ADD_DEPARTMENT: {
                    const newDepartment = await inquirer.prompt(
                        {
                            type: 'input',
                            name: 'department_name',
                            message: 'What is the name of the department you would like to add?'
                        },
                    );
                    await db.query("INSERT INTO departments SET ?", newDepartment);
                    break;
                }
                case Actions.ADD_ROLE: {
                    const [departments] = await db.query('SELECT * FROM departments');

                    const addRoleQuestions = [
                        {
                            type: 'input',
                            name: 'job_title',
                            message: 'What is the job title of the role you are adding?'
                        },
                        {
                            type: 'number',
                            name: 'salary',
                            message: 'What is the salary of the role you are adding?'
                        },
                        {
                            type: 'list',
                            name: 'department_id',
                            message: 'What is the department Id of the role you are adding?',
                            choices: departments.map(({ id, department_name }) => ({
                                name: department_name,
                                value: id
                            }))
                        }
                    ];
                    const newRole = await inquirer.prompt(addRoleQuestions);
                    await db.query("INSERT INTO roles SET ?", newRole);
                    break;
                }
                default:
                    console.log("Not implemented");
            }

            if (action === Actions.ADD_EMPLOYEE) {
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
                    },
                )
            }

            if (action === Actions.UPDATE_EMPLOYEE) {
                const updEmployee = await inquirer.prompt(
                    {
                        type: 'input',
                        name: 'updateEmployeeFirstName',
                        message: 'What is the first name of the employee you are updating?',
                    },
                    {
                        type: 'input',
                        name: 'updateEmployeeLastName',
                        message: 'What is the last name of the employee you are updating?',
                    },
                    {
                        type: 'number',
                        name: 'updateEmployeeRoleID',
                        message: 'What is the role id of the employee you are updating?',
                    },
                    {
                        type: 'input',
                        name: 'updateEmployeeManagerID',
                        message: 'What is the manager id of the employee you are updating?',
                    },
                )
            }

            if (action === Actions.EXIT) {
                exitRequested = true;
                console.log('Bye!');
            }
        }
    } catch (err) {
        console.log(err);
    }
};


init();