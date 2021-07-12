module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        firstname: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        lastname: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        status: {
            type: Sequelize.STRING(50),
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()'),
            allowNull: true
        },
        updatedBy: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()'),
            allowNull: true
        }
    }, { freezeTableName: true });

    return User;
}