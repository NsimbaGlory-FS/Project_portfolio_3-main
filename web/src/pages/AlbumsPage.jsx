import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import SongList from "../components/AlbumsList";
import AlbumList from "../components/AlbumsList";

const AlbumsPage = () => {
  const { artistId } = useParams();
  const [albums, setAlbums] = useState([]);
  const location = useLocation();
  const { name } = location.state;
  console.log(location.state);

  useLayoutEffect(() => {
    axios.get(`http://127.0.0.1:3000/artists/${artistId}`).then((response) => {
      setAlbums(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div
      style={{
        padding: "20px",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p style={{ fontSize: "1.4rem" }}>Albums from {name}</p>
      <AlbumList albums={albums} artistId={artistId} />
    </div>
  );
};

export default AlbumsPage;
