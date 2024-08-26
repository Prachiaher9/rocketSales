const express = require("express");
const router = express.Router();
//const {  jwtAuthMiddleware } = require("../jwt");
const employeeController = require('../controllers/employeeController');


router.post("/register",employeeController.registerEmployee);
router.post("/login", employeeController.loginEmployee);


// Export the router
module.exports = router;


