import React from "react";

import { useParams } from "react-router-dom";

const Opening = () => {
  const { openingName } = useParams();
  return <div>Opening: {openingName}</div>;
};

export default Opening;
