import React, { useState } from "react";
import { Input, Button } from "antd";

const ArtistSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      <Input
        placeholder="Search for an artist"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default ArtistSearch;
