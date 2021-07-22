module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define('Service', {
        // Model attributes are defined here
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        status: {
            type: Sequelize.STRING(7),
            allowNull: false,
            defaultValue: 'online'
        },
        description: {
            type: Sequelize.TEXT(),
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
            allowNull: true
        }
    }, { freezeTableName: true });

    return Service;
}