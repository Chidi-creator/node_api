const express = require("express");
const app = express()
const router = express.Router();
const {getAllEmployees, updateEmployees, createEmployees, deleteEmployee, getEmployee, updateEmployeeUsername} = require('../../controllers/employeesController')
const cookieParser = require('cookie-parser')
const ROLES_LIST = require('../../config/rolesList')
const {verifyRoles} = require('../../middleware/verifyRoles')



router
  .route("/")
  .get( verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  createEmployees)
  
  
  // 
  router.route('/:id')
  .patch(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),updateEmployees)
    .get(getEmployee).delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee)

    router.route('/username/:id')
    .patch(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployeeUsername)

module.exports = router;
