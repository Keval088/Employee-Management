const joi = require('joi').extend(require('@joi/date'))

function departmentValidation(req) {
    const schema = joi.object().keys({
        name: joi.string().trim().min(2).max(100).required(),
        status: joi.number().min(0).max(1).required(),
    });
    return schema.validate(req);
}

function employeeValidation(req) {
    const schema = joi.object().keys({
        name: joi.string().trim().min(2).max(100).required(),
        dob: joi.date().format("YYYY-MM-DD"),
        phone: joi.number().min(10).required(),
        photo: joi.string().allow("").allow(null),
        email: joi.string().optional().allow("").allow(null),
        salary: joi.number().min(0).required(),
        status: joi.number().min(0).max(1).required(),
    });
    return schema.validate(req);
}

module.exports = {
    departmentValidation, employeeValidation
}
