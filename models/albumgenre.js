const Albums  = require('./album.js');
const Genres  = require('./genre.js');
const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize.js');

const AlbumGenres = sequelize.define('AlbumGenres',
    {
        albumId: {
            type: DataTypes.INTEGER,
            references: {
                model: Albums,
                key: "id"
            }
        },
        genreId: {
            type: DataTypes.INTEGER,
            references: {
                model: Genres,
                key: "id"
            }
        },
    }
);

Albums.belongsToMany(Genres, { through: AlbumGenres});
Genres.belongsToMany(Albums, { through: AlbumGenres});
module.exports = AlbumGenres  ;