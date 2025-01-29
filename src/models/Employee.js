const bcrypt = require('bcryptjs');

function Employee(sequelize, Sequelize) {
    return sequelize.define('employees', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        department_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'departments',
                key: "id",
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        dob: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            set(value) {
                if (value) {
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPhone = bcrypt.hashSync(value, salt);
                    this.setDataValue('phone', hashedPhone);
                } else {
                    this.setDataValue('phone', null);
                }
            },
            get() {
                const rawValue = this.getDataValue('phone');
                if (rawValue && bcrypt.hashSync(rawValue, bcrypt.genSaltSync(10)) === rawValue) {
                    return rawValue;
                }
                return rawValue;
            },
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        salary: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false,
    })
}

module.exports = { Employee }