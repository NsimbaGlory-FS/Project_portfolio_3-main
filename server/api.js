const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const { default: SignIn } = require("../my-app/src/SignIn");

const app = express();

app.get("/SignIn", function (req, res) {
  const SpotifyWebApi = SignIn;
  AUTH_URL = "http://localhost:3000";
  clientId = "56457ed506eb4fd7b916be6e7573f55e";
  clientSecret = "143a7e6c3b3c4cf99926d83da01fcdd1";
});
