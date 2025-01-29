const db = require('../database/db');
const { employee } = db;
const { employeeValidation } = require("../service/validation");
const jwt = require("jwt-simple");
const secretKey = 'EmployeeManagement';
const bcrypt = require('bcryptjs');

async function verifyPhoneNumber(employee, inputPhone) {
    return bcrypt.compareSync(inputPhone, employee?.phone);
}

const addEmployee = async (req, res, next) => {
    try {
        const authData = jwt.decode(req.token, secretKey)
        if (!authData) {
            res.status(401).json({ data: { message: authData } })
        } else {
            const { name, dob, phone, email, salary } = req.body;
            const { error } = employeeValidation(req.body);
            if (error) {
                return res.status(403).json({ data: { message: error.details[0].message } });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPhone = bcrypt.hashSync(phone, salt);
            const exists = await employee.findOne({ where: { phone: hashedPhone } });
            if (exists) {
                return res.status(400).json({ data: { message: 'Phone Number is Alreday Exist.' } });
            }

            await employee.create({
                department_id: authData.id,
                name,
                dob,
                phone,
                email,
                salary
            });

            return res.status(200).json({ data: { message: "Employee add successfully" } })
        }
    } catch (err) {
        res.status(400).json({ data: { message: err.message } })
    }
}

const updateEmployee = async (req, res, next) => {
    try {
        const authData = jwt.decode(req.token, secretKey)
        if (!authData) {
            res.status(401).json({ data: { message: authData } })
        } else {
            const id = req.params.id
            const { error } = employeeValidation(req.body);
            if (error) {
                return res.status(403).json({ data: { message: error.details[0].message } });
            }

            const data = await employee.findOne({ where: { id: id } });
            if (data) {
                const salt = bcrypt.genSaltSync(10);
                const hashedPhone = bcrypt.hashSync(req.body.phone, salt);
                const exists = await employee.findOne({ where: { phone: hashedPhone } });
                if (exists) {
                    return res.status(400).json({ data: { message: 'Phone Number is Alreday Exist.' } });
                }
                await employee.update(req.body, { where: { id: id } });
            } else {
                return res.status(200).json({ data: { message: "Employee is not exist." } })
            }

            return res.status(200).json({ data: { message: "Employee update successfully" } })
        }
    } catch (err) {
        res.status(400).json({ data: { message: err.message } })
    }
}

const getEmployeeList = async (req, res, next) => {
    try {
        const authData = jwt.decode(req.token, secretKey)
        if (!authData) {
            res.status(401).json({ data: { message: authData } })
        } else {
            const { page = 1, limit = 10 } = req.query;
            const pageNum = parseInt(page);
            const pageSize = parseInt(limit);

            const { count, rows } = await employee.findAndCountAll({
                where: { department_id: authData?.id },
                limit: pageSize,
                offset: (pageNum - 1) * pageSize,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            const totalPages = Math.ceil(count / pageSize)
            return res.status(200).json({
                data: {
                    totalRecords: count,
                    totalPages: totalPages,
                    currentPage: pageNum,
                    pageSize: pageSize,
                    data: rows,
                }
            })
        }
    } catch (err) {
        res.status(400).json({ data: { message: err.message } })
    }
}

const deleteEmployee = async (req, res, next) => {
    try {
        const authData = jwt.decode(req.token, secretKey)
        if (!authData) {
            res.status(401).json({ data: { message: authData } })
        } else {
            const data = await employee.findOne({ where: { id: req.params.id } });
            if (data) {
                await employee.destroy({ where: { id: req.params.id } });
            } else {
                return res.status(200).json({ data: { message: "Employee is not exist." } })
            }

            return res.status(200).json({ data: { message: "Employee Deleted successfully" } })
        }
    } catch (err) {
        res.status(400).json({ data: { message: err.message } })
    }
}

const employeeStatistics = async (req, res) => {
    try {
        const statistics = await employee.sequelize.query(`
            SELECT 
                d.name AS department, 
                MAX(e.salary) AS highest_salary,
                (SELECT COUNT(*) FROM employees WHERE salary BETWEEN 0 AND 50000) AS '0-50000',
                (SELECT COUNT(*) FROM employees WHERE salary BETWEEN 50001 AND 100000) AS '50001-100000',
                (SELECT COUNT(*) FROM employees WHERE salary > 100000) AS '100000+',
                (SELECT CONCAT(e2.name, ' (', TIMESTAMPDIFF(YEAR, e2.dob, CURDATE()), ' years)') 
                FROM employees e2 
                WHERE e2.department_id = e.department_id 
                ORDER BY e2.dob ASC LIMIT 1) AS youngest_employee
            FROM employees e
            JOIN departments d ON e.department_id = d.id
            GROUP BY d.name
        `, { type: employee.sequelize.QueryTypes.SELECT });

        res.status(200).json({ data: { statistics } });
    } catch (error) {
        res.status(500).json({ data: { message: error.message } });
    }
}

module.exports = {
    addEmployee, updateEmployee, getEmployeeList, deleteEmployee, employeeStatistics
}