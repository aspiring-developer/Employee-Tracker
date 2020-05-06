const mysql = require("mysql");
const inquirer = require("inquirer");

// create connection information to mysql server and sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Stanopal001$",
  database: "employee_tracker_db"
});
connection.connect(err => {
  if (err) throw err;
  // calling "start()" function that gathers user prompt data
  start();
});

//gathering user prompt data and assigning actions 
const start = () => {
  inquirer
    .prompt([
      {
        name: "userChoice",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add Department", "View Department", "Exit", "Add Role", "View Role", "Add Employee", "View Employee", "Update Role"]
      }
    ])
    .then(answer => {
      // assigning different function calls to address user's response
      switch (answer.userChoice) {
        case "Add Department":
          addDepartment();
          break;
        case "View Department":
          viewDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "View Role":
          viewRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Employee":
          viewEmployee();
          break;
        case "Update Roll":
          updateRoll();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
};

// add department to the list
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "add_department",
        type: "input",
        message: "What department do you want to add?"
      },
      {
        name: "add_id",
        type: "input",
        message: "What is the department's ID?"
      }

    ]).then(answer => {
      const query = `INSERT INTO department (dept_name, id) VALUES ('${answer.add_department}', '${answer.add_id}')`;
      connection.query(query, (err, res) => {
if (err) throw err;
 start();
      }) 
  
    });
 };

// view departments in the list
const viewDepartment= () => {
  let userPrompt = "SELECT * FROM department";
  connection.query(userPrompt, (err, res) => {
    if (err) throw err;
    console.log(userPrompt);
    start();
  });

};

// add role to the employee
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "add_role",
        message: "Enter a title/role of the employee."
      },
      {
        type: "input",
        name: "add_salary",
        message: "Enter salary for this role."
      },
      {
        type: "input",
        name: "add_departmentID",
        message: "Enter department ID for this role."
      }
    ])
    .then(answer => {
      const userAnswer = `INSERT INTO employee_role (title, salary, department_id) VALUES ('${answer.add_role}', '${answer.add_salary}', '${answer.add_departmentID}')`;
      connection.query(userAnswer, (err, res) => {
        if (err) throw err;
        console.log(`Added Roles:  ${answers.add_role}, ${answers.add_salary}, ${answers.add_departmentID} `);
        start();
      });
    });
};

// view employee role
const viewRole = () => {
  connection.query("SELECT id, title FROM employee_role", (err, res) => {
    if (err) throw err;
    console.log(res);
    viewEmployee();
  });
};

// add employee to the list
const addEmployee = () => {
  inquirer
  .prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter employee's first name."
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter employee's last name?"
    },
    {
      type: "input",
      name: "roleID",
      message: "Enter employee's role ID."
    },
    {
      type: "input",
      name: "managerID",
      message: "Enter employee's manager ID."
    }
  ])
  .then(answer => {
    const userAnswer = `INSERT INTO employee_info (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleID}', '${answer.managerID}')`;
    connection.query(userAnswer, (err, res) => {
      if (err) throw err;
      console.log(`Added Employee's Info: ${answer.firstName}, ${answer.lastName}, ${answer.roleID}, ${answer.managerID}`);
      start();
    });
  });

};

// view employee list
const viewEmployee = () => {
  connection.query("SELECT * FROM employee_info", (err, res) => {
    if (err) throw err;
    console.log(res);
    start();
  });
};

// update employee role
const updateRoll = () => {
  inquirer
  .prompt([
    {
      type: "input",
      name: "current_id",
      message: "What is the employee's current role ID?"
    },
    {
      type: "input",
      name: "new_id",
      message: "What do you want the employee's new role ID be?"
    }
  ]).then(answer => {
    console.log("WORKING!!!!");
   const userAns = `UPDATE employee_info SET ${answer.new_id} WHERE ${answer.current_id}`;
    connection.query(userAns, (err, res) => {
      if (err) throw err;
      console.log(`Previous ID was:  ${answer.current_id}`);
      console.log(`New ID is:  ${answer.new_id}`);
     start();
    }); 
    
  });
};
