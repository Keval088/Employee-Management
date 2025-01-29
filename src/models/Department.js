function Department(sequelize, Sequelize) {
    return sequelize.define('departments', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false,
    })
}

module.exports = { Department }