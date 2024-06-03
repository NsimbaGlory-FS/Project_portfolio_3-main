import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AlbumPage from "./pages/AlbumsPage";
import SearchResultPage from "./pages/SearchResultPage";
import Callback from "./pages/Callback";
import AlbumSongs from "./pages/AlbumSongs";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/search/:query", element: <SearchResultPage /> },
  { path: "/artists/:artistId", element: <AlbumPage /> },
  { path: "/artists/:artistId/:albumId", element: <AlbumSongs /> },
  { path: "/callback", element: <Callback /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
