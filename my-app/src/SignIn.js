// import React from "react";
// import "./App.css";
// //this my login authorization Endpoint
// // This is my Redirect URI for my app to work with Spotify and Spotify loging in my app http://localhost:3000 and to long me to my home page.
// // This is my Client ID for my app and I took it from my Spotify account (Glory Nsimba) Developer Dashboard
// const handleClick = () => {
//   const clientId = "56457ed506eb4fd7b916be6e7573f55e";
//   const AUTH_URL = "https://accounts.spotify.com/authorize";
//   const redirectUri = "http://localhost:3000/";

//   // This List Scopes are needed when some of the authorization
//   const scope = [
//     "user-modify-playback-state",
//     "user-read-playback-state",
//     "user-read-currently-playing",
//     "user-read-recently-played",
//     "user-top-read",
//   ];
//   window.location.href = `${AUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope.join(
//     "20"
//   )}&response_type=token&show_dialog=true`;
// };
// export default function SignIn() {
//   return (
//     <button className="App" onClick={handleClick}>
//       SignIn to Spotify
//     </button>
//   );
// }
