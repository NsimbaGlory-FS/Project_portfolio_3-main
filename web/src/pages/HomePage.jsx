import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistList from "../components/ArtistList";
import ArtistSearch from "../components/ArtistSearch";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:3000/artists")
      .then((response) => {
        setArtists(response.data);
        console.log(response.data);
        setLoading(true);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (query) => {
    axios
      .get(`http://127.0.0.1:3000/search?q=${query}`)
      .then((response) => {
        setArtists(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleArtistClick = (artistId, name) => {
    navigate(`/artists/${artistId}`, { state: { name: name } });
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <>
          <ArtistSearch onSearch={handleSearch} />
          <ArtistList artists={artists} onArtistClick={handleArtistClick} />
        </>
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </p>
      )}
    </div>
  );
};

export default HomePage;
