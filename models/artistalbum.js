const Artists = require('./artist.js');
const Albums  = require('./album.js');
const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize.js');

const ArtistAlbums = sequelize.define('ArtistAlbums',
    {
        artistId: {
            type: DataTypes.INTEGER,
            references: {
                model: Artists,
                key: "id"
            }
        },
        albumId: {
            type: DataTypes.INTEGER,
            references: {
                model: Albums,
                key: "id"
            }
        },
    },
    {
        tableName: 'ArtistAlbums',
        timestamps: true,
    }
);

Artists.belongsToMany(Albums, { through: ArtistAlbums});
Albums.belongsToMany(Artists, { through: ArtistAlbums});
module.exports = ArtistAlbums ;


