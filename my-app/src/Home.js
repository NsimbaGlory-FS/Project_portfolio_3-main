import React from "react";
import { useSate } from "react";
import auth from "./auth";
import "bootstrap/dist/css/bootstrap.min.css";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "56457ed506eb4fd7b916be6e7573f55e",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [searchTerm, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [playerTrack, setPlayerTrack] = React.useState();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  function chooseTrack(track) {
    setPlayerTrack(track);
    setSearch("");
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <input
        type="text"
        placeholder="songs, artists"
        className="w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="mt-8">{searchTerm && <p>{searchTerm}</p>}</div>
    </div>
  );
}
