import React from "react";
import { useNavigate } from "react-router-dom";
import Profesor from "../components/Profesor";
import Student from "../components/Student";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Profesor/>
        <Student/>
      </div>
    </>
  );
};

export default Homepage;
