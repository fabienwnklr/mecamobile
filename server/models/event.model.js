module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define(
        'Event',
        {
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            start: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            end: {
                type: Sequelize.STRING(155),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT(),
                allowNull: true
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
        },
        { freezeTableName: true }
    );

    return Event;
};
