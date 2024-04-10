import React, { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import openings from "../../openings.json";

const SearchBar = ({ setResults }) => {
  const [search, setSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState(-1);

  useEffect(() => {
    setSearchSuggestions(
      openings
        .filter((item) => {
          const searchTerm = search.toLowerCase();
          const opening = item.toLowerCase();

          return searchTerm && opening.includes(searchTerm);
        })
        .slice(0, 8)
    );
  }, [search]);

  const handleChange = (value) => {
    setSearch(value);
  };

  const handlePlayerSubmit = () => {
    if (
      searchSuggestions.length &&
      search.toLowerCase() === searchSuggestions[0].toLowerCase()
    ) {
      handleOpeningSubmit(searchSuggestions[0]);
    } else {
      setResults(["Player", search]);
    }
  };

  const handleOpeningSubmit = (item) => {
    setResults(["Opening", item]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (selectedSearch >= 0) {
        handleOpeningSubmit(searchSuggestions[selectedSearch]);
      } else {
        handlePlayerSubmit();
      }
    }
    if (e.key === "ArrowUp" && selectedSearch > -1) {
      setSelectedSearch((prev) => prev - 1);
    }
    if (
      e.key === "ArrowDown" &&
      selectedSearch < searchSuggestions.length - 1
    ) {
      setSelectedSearch((prev) => prev + 1);
    }
  };

  return (
    <div className={styles["search-container"]}>
      <div className={styles["input-wrapper"]}>
        <input
          placeholder="Search your chess.com username or an Opening"
          value={search}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => onKeyDown(e)}
        ></input>
        <div className={styles["search-icon-wrapper"]}>
          <FaSearch
            id={styles["search-icon"]}
            onClick={() => handlePlayerSubmit()}
          />
        </div>
      </div>
      <div className={styles["autosuggest"]}>
        {searchSuggestions.map((item, index) => (
          <ul
            onClick={() => handleOpeningSubmit(item)}
            onMouseEnter={() => setSelectedSearch(index)}
            className={
              selectedSearch === index
                ? styles["dropdown-row-highlighted"]
                : styles["dropdown-row"]
            }
            key={index}
          >
            {item}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
