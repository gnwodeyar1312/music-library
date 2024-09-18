require("dotenv").config();
const express = require("express");
const sequelize = require("./lib/sequelize.js");
const artistModel = require("./models/artist.js");
const albumModel = require("./models/album.js");
const genreModel = require("./models/genre.js");
const artistAlbumModel = require("./models/artistAlbum.js");
const albumGenreModel = require("./models/albumGenre.js");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database Connected and Synced");
  })
  .catch(() => {
    console.error("Unable to Connect");
  });

async function getAlbumGenres(albumId) {
  const albumGenres = await albumGenreModel.findAll({
    where: { albumId },
  });

  const genres = [];
  for (let albumGenre of albumGenres) {
    const genre = await genreModel.findOne({
      where: { id: albumGenre.genreId },
    });
    if (genre) genres.push(genre);
  }

  return genres;
}

async function getArtistAlbums(albumId) {
  const albumArtists = await artistAlbumModel.findAll({
    where: { albumId },
  });

  const artists = [];
  for (let albumArtist of albumArtists) {
    const artist = await artistModel.findOne({
      where: { id: albumArtist.artistId },
    });
    if (artist) artists.push(artist);
  }

  return artists;
}

const getAlbumsWithAssociations = async (albumData) => {
  try {
    const artists = await getArtistAlbums(albumData.id);
    const genres = await getAlbumGenres(albumData.id);

    return {
      ...albumData.dataValues,
      artist: artists.length > 0 ? artists[0] : null,
      genre: genres.length > 0 ? genres[0] : null,
    };
  } catch (error) {
    console.error("Error fetching albums with associations:", error);
  }
};

//Exercise 1: Get All Albums
app.get("/albums", async (req, res) => {
  try {
    let albums = await albumModel.findAll();
    let albumDetails = [];
    for (let albumData of albums) {
      const detailsData = await getAlbumsWithAssociations(albumData);
      albumDetails.push(detailsData);
    }
    return res.json({ albums: albumDetails });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return res.status(500).json({ error: "Failed to fetch Albums" });
  }
});

//Exercise 2: Get Album by ID

app.get("/albums/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let albums = await albumModel.findOne({ where: { id } });

    let albumDetails = await getAlbumsWithAssociations(albums);
    return res.json({ albums: albumDetails });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return res.status(500).json({ error: "Failed to fetch Albums" });
  }
});

//Exercise 3: Get Albums Sorted by Release Year
app.get("/albums/sort-by-release", async (req, res) => {
  try {
    let order = req.query.order;
    let albums = await albumModel.findAll({ order: [["release_year", order]] });

    let albumDetails = [];
    for (let albumData of albums) {
      const detailsData = await getAlbumsWithAssociations(albumData);
      albumDetails.push(detailsData);
    }
    return res.json({ albums: albumDetails });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return res.status(500).json({ error: "Failed to fetch Albums" });
  }
});

//Exercise 4: Add New Album

app.get('')

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
