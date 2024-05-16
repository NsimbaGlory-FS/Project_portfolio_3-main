import React, { Component } from "react";
import { Container } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=56457ed506eb4fd7b916be6e7573f55e&http://localhost:3000";

export default function SignIn() {
  return (
    <Container className="d-flex justify-s">
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        SignIn with spotify
      </a>
    </Container>
  );
}
