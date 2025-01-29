const express = require("express")
const { addEmployee, updateEmployee, deleteEmployee, getEmployeeList, employeeStatistics } = require('../controllers/employeeControllers');
const { tokenVerify } = require('../middleware/auth');
const { upload_image } = require('../middleware/fileUpload');

const router = express.Router();

router.post('/employee', tokenVerify, upload_image, addEmployee);
router.put('/employee/:id', tokenVerify, upload_image, updateEmployee);
router.get('/employee', tokenVerify, getEmployeeList);
router.delete('/employee/:id', tokenVerify, deleteEmployee);
router.get('/employee/statistics', employeeStatistics);

module.exports = router;