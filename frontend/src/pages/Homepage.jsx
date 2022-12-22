import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>HOMEPAGE</h1>
        <profesor></profesor>
        <student></student>
      </div>
    </>
  );
};

export default Homepage;
