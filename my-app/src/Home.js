import { useSate } from "react";
import auth from "./auth";
import { Container, Form } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "56457ed506eb4fd7b916be6e7573f55e",
  redirectUri: "http://localhost:3000/callback",
});

export default function Home({ code }) {
  const accessToken = auth(code);
  const [search, setSearch] = useSate("");
  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ Height: "100vh" }}
    >
      <Form.Control
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Container>
  );
}
