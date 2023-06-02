const Employee = require("../models/Employee");

// Show the list of Employees

const index = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

// Show single employee
const show = (req, res, next) => {
  const employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

// add an employeee
const store = (req, res, next) => {
  const employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  if (req.file) {
    employee.avatar = req.file.path;
  }
  employee
    .save()
    .then((respnse) => {
      res.json({
        message: "Employee Added Successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

// upadate an employee
const update = (req, res, next) => {
  const employeeID = req.body.employeeID;

  const updatedData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };

  Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
    .then(() => {
      res.json({
        message: "Emplyee updated successfuly!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

// delete an employee

const destroy = (req, res, next) => {
  const employeeID = req.body.employeeID;
  Employee.findByIdAndRemove(employeeID)
    .then(() => {
      res.json({
        message: "Employee deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
