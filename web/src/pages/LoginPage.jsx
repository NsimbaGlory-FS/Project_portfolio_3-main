import React from "react";
import { Button } from "antd";
import styles from "./LoginPage.module.css";
import logo from "../assets/spotify-logo.png";

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&response_type=code&redirect_uri=${
      import.meta.env.VITE_REDIRECT_URI
    }&scope=user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state`;
  };

  return (
    <div className={styles.page}>
      <img src={logo} />
      <Button type="primary" onClick={handleLogin}>
        Sign In with Spotify
      </Button>
    </div>
  );
};

export default LoginPage;
