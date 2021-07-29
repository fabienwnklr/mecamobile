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
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: true,
            unique: true,
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        visible: {
            type: Sequelize.STRING(50),
            defaultValue: false,
            allowNull: false
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