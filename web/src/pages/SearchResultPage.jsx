import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ArtistList from "../components/ArtistList";

const SearchResultPage = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  document.title = query;
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/search?q=${query}`)
      .then((response) => {
        setArtists(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, [query]);

  const handleArtistClick = (artistId, name) => {
    navigate(`/artist/${artistId}`, { state: { name } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <ArtistList artists={artists} onArtistClick={handleArtistClick} />
    </div>
  );
};

export default SearchResultPage;
