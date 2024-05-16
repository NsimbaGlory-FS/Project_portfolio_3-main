//this my login authorization Endpoint
const apiUrl = "https://accounts.spotify.com/authorize";
// This is my Redirect URI for my app to work with Spotify and Spotify loging in my app http://localhost:3000 and to long me to my home page.
const redirectUri = "http://localhost:3000/";
// This is my Client ID for my app and I took it from my Spotify account (Glory Nsimba) Developer Dashboard
const clientId = "56457ed506eb4fd7b916be6e7573f55e";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  ""
)}&response_type=token&show_dialog=true`;
