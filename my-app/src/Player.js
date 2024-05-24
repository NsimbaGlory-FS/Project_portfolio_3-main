import React, { useEffect } from "react";
import axios from "axios";

export default function Player() {
  const [{ token, playerState }, dispatch] = useEffect();
const state = playerState ? "pause" : "play";
  
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };
  const Player = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    
    
      dispatch({ type: Player.SET_PLAYING });
  };
 

  return (
    <div>
      <h1> Player </h1>
      <h2> {token} </h2>
      <h2> {playerState} </h2>
      </div>
  )