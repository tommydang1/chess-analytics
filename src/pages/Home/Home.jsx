import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { fetchPlayerData } from "../../utils/searchUtils";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../components/SearchBar/SearchBar";

function Home() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(results);
    if (results[0] == "Player") {
      fetchPlayerData(results[1]).then((response) => {
        if (response) {
          navigate(`/profile/${results[1]}`);
        } else {
          console.log("error");
        }
      });
    } else if (results[0] == "Opening") {
      navigate(`/opening/${results[1]}`);
    }
  }, [results]);

  return (
    <div className={styles["home"]}>
      <div className={styles["search-bar-container"]}>
        <SearchBar setResults={setResults} />
      </div>
    </div>
  );
}

export default Home;
