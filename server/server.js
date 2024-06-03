require("dotenv").config();
const cors = require("cors");
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
const port = 3000;
app.use(cors());
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URL,
});

app.get("/login", (req, res) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-modify-playback-state",
  ];
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get("/callback", (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  console.log("error: ", error);
  console.log("code: ", code);

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const accessToken = data.body["access_token"];
      const refreshToken = data.body["refresh_token"];
      const expiresIn = data.body["expires_in"];
      console.log("Data: ", data);

      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);
      console.log("The access token is " + accessToken);
      console.log("The refresh token is " + refreshToken);

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const accessTokenRefreshed = data.body["access_token"];
        spotifyApi.setAccessToken(accessTokenRefreshed);
      }, (expiresIn / 2) * 1000);
      res.redirect("http://localhost:5173/home");
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send("Error getting tokens");
    });
});

app.get("/artists", async (req, res) => {
  try {
    const genres = ["rock", "pop", "jazz", "classical", "electronic"];
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    const randomQuery = `${randomGenre} random`;
    const searchData = await spotifyApi.searchArtists(randomQuery);
    const artists = searchData.body.artists.items;
    res.send(artists);
  } catch (err) {
    console.error("Search Error:", err);
    res.send("Error occurred during search");
  }
});
app.get("/artists/:artistId", async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const albums = await spotifyApi.getArtistAlbums(artistId);
    console.log("Albums ", albums.body.items);
    const albumList = albums.body.items.map((album) => ({
      name: album.name,
      group: album.group,
      id: album.id,
      albumCover: album.images[0],
    }));
    res.send(albumList);
  } catch (err) {
    console.error("Error getting artist's top tracks:", err);
    res.status(500).send("Error occurred while fetching artist's songs");
  }
});
app.get("/albums/:albumId", async (req, res) => {
  try {
    const albumId = req.params.albumId;
    const album = await spotifyApi.getAlbumTracks(albumId);
    console.log("album: ", album.body.items);
    const songs = album.body.items.map((track) => ({
      name: track.name,
      uri: track.uri,
      trackNumber: track.track_number,
      duration: track.duration_ms,
    }));
    res.send(songs);
  } catch (err) {
    console.error("Error getting album tracks:", err);
    res.status(500).send("Error occurred while fetching album songs");
  }
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  spotifyApi
    .searchArtists(q)
    .then((searchData) => {
      const artists = searchData.body.artists.items;
      res.send(artists);
    })
    .catch((err) => {
      console.error("Search Error:", err);
      res.send("Error occurred during search");
    });
});

app.get("/play", (req, res) => {
  const { uri } = req.query;
  console.log(uri);
  spotifyApi
    .play({ uris: uri })
    .then(() => {
      res.send("Playback started");
    })
    .catch((err) => {
      console.error("Play Error:", err);
      res.send("Error occurred during playback");
    });
});

// Start the Express server.
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
