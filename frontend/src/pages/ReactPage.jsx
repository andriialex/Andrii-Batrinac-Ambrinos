import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../features/auth/authSlice";
import useRedirectLoggedOut from "../hooks/useRedirectLoggedOut";
import useUserData from "../hooks/useUserData";

function ReactPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curs, setCurs] = useState(null);

  useRedirectLoggedOut();
  useUserData();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    async function logout() {
      var response = await fetch("/api/logout");
      const json = await response.json();
      toast.success(json.message, {
        position: "bottom-center",
        autoClose: 2000,
      });
      dispatch(LOGOUT());
      navigate("/login");
    }
    logout();
  };

  const handleFeedback = (feedbackGiven) => {
    const body = {
      idActivity: id,
      feedback: feedbackGiven
    }
    fetch("/api/feedback", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.feedback) {
          toast.error(data.message, {
            position: "bottom-center",
            autoClose: 5000,
          });
        } else {
          toast.success(data.message, {
            position: "bottom-center",
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch("/api/cursuri")
      .then((data) => {
        if (!data.ok) {
          throw Error("could not fetch the data");
        }
        return data.json();
      })
      .then((data) => {
        setData(data);
        const curs = data.find((item) => item.id == id);
        setCurs(curs);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            REACT PAGE
          </span>
          <div className="flex md:order-2">
            <a href="/">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                STUDENT PAGE
              </button>
            </a>
          </div>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </nav>


      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl mx-auto mt-10">
        <div className="flex flex-col items-center pb-10">

          {loading && <p>Loading...</p>}
          {error && <div>{error}</div>}
          <h5 className="mb-1 text-xl font-medium text-gray-900 py-5">
            {curs && curs.title}
          </h5>
          <span className="text-sm text-gray-500">
            {curs && curs.description}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={(event) => handleFeedback("helpful")}
            >
              Helpful
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={(event) => handleFeedback("confusing")}
            >
              Confusing
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={(event) => handleFeedback("boring")}
            >
              Boring
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReactPage;
