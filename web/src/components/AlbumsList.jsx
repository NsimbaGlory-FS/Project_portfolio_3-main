import React from "react";
import { List } from "antd";
import { useNavigate } from "react-router-dom";

const AlbumList = ({ albums, artistId }) => {
  console.log(albums);
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        width: "90vw",
      }}
    >
      {albums.map((album) => (
        <div
          onClick={() =>
            navigate(`/artists/${artistId}/${album.id}`, {
              state: {
                albumCover: album.albumCover.url,
                albumName: album.name,
              },
            })
          }
          key={album.id}
          style={{ textAlign: "center" }}
        >
          <img
            src={album.albumCover.url}
            alt="Album Cover"
            style={{ width: "100%", height: "auto" }}
          />
          <div>{album.name}</div>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
