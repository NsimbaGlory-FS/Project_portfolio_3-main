const express = require("express");
require("dotenv").config();
const app = express();
const SpotifyWebApi = require("spotify-web-api-node");
const port = 3000;
const router = express.Router();

const SpotifyApi = new SpotifyWebApi({
  clientId: "56457ed506eb4fd7b916be6e7573f55e",
  clientSecret: "143a7e6c3b3c4cf99926d83da01fcdd1",
  redirectUri: "http://localhost:3000/callback",
});

app.get("/SignIn", (req, res, next) => {
  const scope = [
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
    "user-read-private",
  ];
  res.redirect(SpotifyApi.createAuthorizeURL(scopes));
});
// Route for callback endpoint after SignIn
app.get("/callback", (req, res, next) => {
  const code = req.query.code;
  const error = req.query.error;
});

// If there is an error, log it and send a response to the user.
if (error) {
  console.error("Callback Error:", error);
  res.send(`Callback Error: ${error}`);
  return;
}

// Exchange the code for an access token and a refresh token.
spotifyApi
  .authorizationCodeGrant(code)
  .then((data) => {
    const accessToken = data.body["access_token"];
    const refreshToken = data.body["refresh_token"];
    const expiresIn = data.body["expires_in"];

    // Set the access token and refresh token on the Spotify API object.
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);

    // Logging tokens can be a security risk; this should be avoided in production.
    console.log("The access token is " + accessToken);
    console.log("The refresh token is " + refreshToken);

    // Send a success message to the user.
    res.send(
      "Login successful! You can now use the /search and /play endpoints."
    );

    // Refresh the access token periodically before it expires.
    setInterval(async () => {
      const data = await spotifyApi.refreshAccessToken();
      const accessTokenRefreshed = data.body["access_token"];
      spotifyApi.setAccessToken(accessTokenRefreshed);
    }, (expiresIn / 2) * 1000); // Refresh halfway before expiration.
  })
  .catch((error) => {
    console.error("Error getting Tokens:", error);
    res.send("Error getting tokens");
  });

// Route handler for the search endpoint.
app.get("/search", (req, res) => {
  // Extract the search query parameter.
  const { q } = req.query;

  // Make a call to Spotify's search API with the provided query.
  spotifyApi
    .searchTracks(q)
    .then((searchData) => {
      // Extract the URI of the first track from the search results.
      const trackUri = searchData.body.tracks.items[0].uri;
      // Send the track URI back to the client.
      res.send({ uri: trackUri });
    })
    .catch((err) => {
      console.error("Search Error:", err);
      res.send("Error occurred during search");
    });
});

// Route handler for the play endpoint.
app.get("/play", (req, res) => {
  // Extract the track URI from the query parameters.
  const { uri } = req.query;

  // Send a request to Spotify to start playback of the track with the given URI.
  spotifyApi
    .play({ uris: [uri] })
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
