const express = require("express")
const { tokenVerify } = require('../middleware/auth');
const { addDepartment, updateDepartment, getDepartmentList, deleteDepartment } = require('../controllers/departmentControllers');
const router = express.Router();

router.post('/department', addDepartment);
router.put('/department', tokenVerify, updateDepartment);
router.get('/department', tokenVerify, getDepartmentList);
router.delete('/department', tokenVerify, deleteDepartment);

module.exports = router;