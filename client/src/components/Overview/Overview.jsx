import React, { useState, useEffect } from "react";
import styles from "./Overview.module.css";

const Overview = ({ backendData }) => {
  const [playerStats, setPlayerStats] = useState([{}]);

  const getPlayerStats = async () => {
    try {
      console.log(backendData.username);
      let response = await fetch(
        `https://api.chess.com/pub/player/${backendData.username}/stats`
      );
      let data = await response.json();
      console.log(data);
      setPlayerStats(data);
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  useEffect(() => {
    getPlayerStats();
  }, [backendData]);

  return (
    <div className={styles["container"]}>
      {playerStats?.length ? (
        <div>Loading Player Stats...</div>
      ) : (
        <div>
          <div>FIDE: {playerStats.fide}</div>
          <div>BLITZ: {playerStats.chess_blitz.last.rating}</div>
          <div>BLITZ BEST: {playerStats.chess_blitz.best.rating}</div>
          <div>BULLET: {playerStats.chess_bullet.last.rating}</div>
          <div>BULLET BEST: {playerStats.chess_bullet.best.rating}</div>
          <div>RAPID: {playerStats.chess_rapid.last.rating}</div>
          <div>RAPID BEST: {playerStats.chess_rapid.best.rating}</div>
        </div>
      )}
    </div>
  );
};

export default Overview;
