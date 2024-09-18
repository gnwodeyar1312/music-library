const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize.js');

const Artists = sequelize.define('Artists',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },


    },
    {
        tableName: 'Artists',
        timestamps: true,
    }
);

module.exports = Artists;