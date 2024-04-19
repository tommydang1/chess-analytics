import { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import { fetchPlayerData } from "../../utils/searchUtils";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import Overview from "../../components/Overview/Overview";

const Profile = () => {
  const { userName } = useParams();
  // const [playerData, setPlayerData] = useState("");
  const [backendData, setBackendData] = useState([{}]);

  const postPlayer = async (body = {}) => {
    try {
      let response = await fetch("http://localhost:4000/player", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let data = await response.json();
      setBackendData(body);
      console.log(data);
    } catch (err) {
      console.log("POST ERROR", err);
    }
  };

  const getPlayer = async (playerData) => {
    try {
      let response = await fetch(
        `http://localhost:4000/player?username=${playerData.username}`,
        {
          method: "GET",
        }
      );
      let data = await response.json();
      setBackendData(data);
    } catch (err) {
      console.log("GET ERROR: ", err);
      postPlayer(playerData);
    }
  };

  useEffect(() => {
    fetchPlayerData(userName).then((data) => {
      if (data) {
        getPlayer(data);
      }
    });
  }, []);

  return (
    <div>
      {!backendData ? (
        <div>Loading Player Data...</div>
      ) : (
        <div className={styles["container"]}>
          <ProfileInfo backendData={backendData} />
          <Overview backendData={backendData} />
        </div>
      )}
    </div>
  );
};

export default Profile;
