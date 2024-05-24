import React from "react";
import { Container } from "react-bootstrap";

export default function Login() {
  const handleClick = async () => {
    const client_id = "56457ed506eb4fd7b916be6e7573f55e";
    const redirect_uri = "http://localhost:3000";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ minHeight: "100vh" }}
    >
      <button className=" btn btn-success" onClick={handleClick}>
        Sign In to Spotify
      </button>
    </Container>
  );
}
