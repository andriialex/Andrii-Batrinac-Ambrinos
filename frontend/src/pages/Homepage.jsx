import React from "react";
import { useNavigate } from "react-router-dom";
import Profesor from "../components/Profesor";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Profesor/>
        {/* <student></student> */}
      </div>
    </>
  );
};

export default Homepage;
