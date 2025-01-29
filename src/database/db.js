const Sequelize = require('sequelize');
const { Employee } = require('../models/Employee');
const { Department } = require('../models/Department');

const dbName = 'management';
const dbUser = 'root';
const dbPassword = '';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: dbName,
    username: dbUser,
    password: dbPassword,
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.department = Department(sequelize, Sequelize)
db.employee = Employee(sequelize, Sequelize)

db.employee.belongsTo(db.department, { foreignKey: "department_id", targetKey: "id" });
db.department.hasMany(db.employee, { foreignKey: 'department_id' });

db.sequelize.sync({ alter: true });
db.sequelize.authenticate().then(async () => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = db