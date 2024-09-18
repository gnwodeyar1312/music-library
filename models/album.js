const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize.js');

const Albums = sequelize.define('Albums',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        release_year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },



    },
    {
        tableName: 'Albums',
        timestamps: true,
    }
);

module.exports = Albums;