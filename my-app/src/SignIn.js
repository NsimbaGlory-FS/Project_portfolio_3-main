import React from "react";
import "./App.css";

export default function SignIn() {
  const handleClick = () => {
    const client_id = "56457ed506eb4fd7b916be6e7573f55e";
    const AUTH_URL = "https://accounts.spotify.com/authorize";
    const redirect_uri = "http://localhost:3000/";

    const scope = [
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${AUTH_URL}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      "20"
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="App">
      <button onClick={handleClick}>Sign In to Spotify</button>
    </div>
  );
}
