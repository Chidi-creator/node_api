const Employees = require("../model/Employees");

const { checkId } = require("../config/checkID");

const getAllEmployees = async (req, res) => {
  const employees = await Employees.find();
  if (!employees)
    return res.status(204).json({ message: "No employees found" });
  res.status(200).json(employees);
};

const createEmployees = async (req, res) => {
  const { firstname, lastname } = req.body;

  if (!firstname || !lastname)
    return res.json(400).json({ message: "Firstname and Lastname required" });

  try {
    const employee = await Employees.create({
      firstname,
      lastname,
    });

    res.status(201).json(employee);
  } catch (err) {
    console.log(err);
  }
};

const updateEmployees = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID parameter required" });
  try {
    if (!checkId(id))
      return res.status(400).json({ message: `${id} is an invalid ID` });
    const employee = await Employees.findById(id);

    if (!employee)
      return res.status(400).json({ message: `No Employee matches ID ${id}` });

    const { firstname, lastname } = req.body;

    employee.firstname = firstname;
    employee.lastname = lastname;

    const result = await employee.save();

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};
//testing for only updating employee firstname
const updateEmployeeUsername = async (req, res) => {
  const { id } = req.params;
  const { firstname } = req.body;

  try {
    if (!checkId(id))
      return res.status(400).json({ message: `${id} is an invalid ID` });
    const employee = await Employees.findById(id);

    if (!employee)
      return res.status(400).json({ message: `No Employee matches ID ${id}` });

    employee.firstname = firstname;

    const result = await employee.save();
    res.json(result)
  } catch (err) {
    console.log(err);
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "ID parameter required" });
  try {
    if (!checkId(id))
      return res.status(400).json({ message: `${id} is an invalid ID` });
    const employee = await Employees.findByIdAndDelete(id);
    if (!employee)
      return res.status(400).json({ message: `No Employee matches ID ${id}.` });

    res.json(employee);
  } catch (err) {
    console.log(err);
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    if (!checkId(id))
      return res.status(400).json({ message: `${id} is an invalid ID` });
    const employee = await Employees.findById(id);

    if (!employee)
      return res.status(400).json({ message: `No Employee matches ID ${id}.` });

    res.status(200).json(employee);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllEmployees,
  createEmployees,
  deleteEmployee,
  getEmployee,
  updateEmployees,
  updateEmployeeUsername
};
