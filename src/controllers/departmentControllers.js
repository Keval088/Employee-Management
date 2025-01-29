const db = require('../database/db');
const { department } = db;
const { departmentValidation } = require("../service/validation");
const jwt = require("jwt-simple");
const secretKey = 'EmployeeManagement';

const addDepartment = async (req, res, next) => {
    try {
        const { name, status } = req.body;
        const { error } = departmentValidation(req.body);
        if (error) {
            return res.status(403).json({ data: { message: error.details[0].message } });
        }

        let data = await department.findOne({ where: { name: name } });
        if (!data) {
            data = await department.create({ name, status });
        }
        const token_key = jwt.encode({ email: name, id: data?.id }, secretKey);

        return res.status(200).json({ data: { message: "Deparment add successfully", token_key: token_key } })
    } catch (err) {
        res.status(400).json({ data: { message: err.message } })
    }
}

const updateDepartment = async (req, res, next) => {
    try {
        const authData = jwt.decode(req.token, secretKey)
        if (!authData) {
            res.status(401).json({ data: { message: authData } })
        } else {
            const { name, status } = req.body;
            const { error } = departmentValidation(req.body);
            if (error) {
                return res.status(403).json({ data: { message: error.details[0].message } });
            }

            const data = await department.findOne({ where: { id: authData?.id } });
            if (data) {
                await department.update({ name, status }, { where: { id: authData?.id } });
            } else {
                return res.status(200).json({ data: { message: "Deparment is not exist." } })
            }

            return res.status(200).json({ data: { message: "Deparment update successfully" } })
        }
    } catch (err) {
        res.status(400).json({ data: { message: err.message } })
    }
}

const getDepartmentList = async (req, res, next) => {
    try {
        const authData = jwt.decode(req.token, secretKey)
        if (!authData) {
            res.status(401).json({ data: { message: authData } })
        } else {
            const data = await department.findOne({ where: { id: authData?.id } });
            return res.status(200).json({ data: { data } })
        }
    } catch (err) {
        res.status(400).json({ data: { message: err.message } })
    }
}

const deleteDepartment = async (req, res, next) => {
    try {
        const authData = jwt.decode(req.token, secretKey)
        if (!authData) {
            res.status(401).json({ data: { message: authData } })
        } else {
            const data = await department.findOne({ where: { id: authData?.id } });
            if (data) {
                await department.destroy({ where: { id: authData?.id } });
            } else {
                return res.status(200).json({ data: { message: "Deparment is not exist." } })
            }

            return res.status(200).json({ data: { message: "Deparment Deleted successfully" } })
        }
    } catch (err) {
        res.status(400).json({ data: { message: err.message } })
    }
}

module.exports = {
    addDepartment, updateDepartment, deleteDepartment, getDepartmentList
}