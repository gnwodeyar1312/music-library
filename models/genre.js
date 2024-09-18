const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize.js');

const Genres = sequelize.define('Genres',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },


    },
    {
        tableName: 'Genres',
        timestamps: true,
    }
);

module.exports = Genres ;