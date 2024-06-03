import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./AlbumSongs.module.css"; // Import CSS module

const formatDuration = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const AlbumSongs = () => {
  const [songs, setSongs] = useState([]);
  const { albumId } = useParams();
  const location = useLocation();
  const { albumCover, albumName } = location.state;

  useLayoutEffect(() => {
    axios.get(`http://127.0.0.1:3000/albums/${albumId}`).then((response) => {
      setSongs(response.data);
    });
  }, [albumId]);

  return (
    <div className={styles.albumSongsContainer}>
      <h1>{albumName}</h1>
      <img style={{ width: "30%" }} src={albumCover} />
      <h4>Track List</h4>

      <ul className={styles.songList}>
        {songs.map((song) => (
          <li key={song.id} className={styles.songItem}>
            <span className={styles.trackNumber}>{song.trackNumber}</span>
            <span className={styles.songName}>{song.name}</span>
            <span className={styles.songDuration}>
              {formatDuration(song.duration)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumSongs;
