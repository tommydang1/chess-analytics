import React from "react";

import styles from "./SearchResultsList.module.css";

const SearchResultsList = ({ results }) => {
  console.log(results);
  return (
    <div>
      {/* {results.map((result, id) => {
        return <div key={id}>{result}</div>;
      })} */}
    </div>
  );
};

export default SearchResultsList;
