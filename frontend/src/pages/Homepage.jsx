import React from "react";
import { useSelector } from "react-redux";
import Profesor from "../components/Profesor";
import Student from "../components/Student";
import { selectUser } from "../features/auth/authSlice";
import useRedirectLoggedOut from "../hooks/useRedirectLoggedOut";
import useUserData from "../hooks/useUserData";

const Homepage = () => {
  useRedirectLoggedOut();
  useUserData();

  const user = useSelector(selectUser);
  return (
    <>
      {user && user.isProffesor ? <Profesor /> : null}
      {user && !user.isProffesor ? <Student /> : null}
    </>
  );
};

export default Homepage;
