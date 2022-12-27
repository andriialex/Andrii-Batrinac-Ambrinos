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


      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg mx-auto mt-10">
        <div className="flex flex-col items-center pb-5">

          {loading && <p className="mb-10">Loading...</p>}
          {error && <div>{error}</div>}
          <p className="text-center text-gray-500">Activity:</p>
          <h5 className="mb-1 text-xl font-bold text-gray-900">

            {curs && curs.title}
          </h5>
          <p className="text-center text-gray-500">Description:</p>
          <span className="text-sm">
            {curs && curs.description}
          </span>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:max-w-5xl lg:px-8">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg mx-auto my-4 py-4">
            <h1 className="text-center text-xl font-bold">Reacts</h1>
            <p className="text-center text-md">Choose one</p>
          </div>

          <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <a href="#" className="group" onClick={() => { handleFeedback("smiley") }}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8 hover:bg-gray-100">
                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/facebook/327/smiling-face-with-smiling-eyes_1f60a.png" alt="Smiley Face" className="h-full w-full object-cover object-center p-10" />
              </div>
              <p className="mt-1 text-lg font-medium text-gray-900 text-center pt-2">Smiley Face</p>
            </a>

            <a href="#" className="group" onClick={() => { handleFeedback("frowny") }}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8 hover:bg-gray-100">
                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/facebook/327/slightly-frowning-face_1f641.png" alt="Frowny Face" className="h-full w-full object-cover object-center p-10" />
              </div>
              <p className="mt-1 text-lg font-medium text-gray-900 text-center pt-2">Frowny Face</p>
            </a>

            <a href="#" className="group" onClick={() => { handleFeedback("surprised") }}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8 hover:bg-gray-100">
                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/facebook/327/face-with-open-mouth_1f62e.png" alt="Surprised Face" className="h-full w-full object-cover object-center p-10" />
              </div>
              <p className="mt-1 text-lg font-medium text-gray-900 text-center pt-2">Surprised Face</p>
            </a>

            <a href="#" className="group" onClick={() => { handleFeedback("confused") }}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8 hover:bg-gray-100">
                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/facebook/327/confused-face_1f615.png" alt="Confused face" className="h-full w-full object-cover object-center p-10" />
              </div>
              <p className="mt-1 text-lg font-medium text-gray-900 text-center pt-2">Confused Face</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReactPage;
