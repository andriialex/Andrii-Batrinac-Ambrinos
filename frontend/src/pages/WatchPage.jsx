import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT, selectUser } from "../features/auth/authSlice";
import supabase from "../utils/configSupabase"
import useRedirectLoggedOut from "../hooks/useRedirectLoggedOut";
import useUserData from "../hooks/useUserData";

function WatchPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curs, setCurs] = useState(null);
  const [feedbacks, setFeedbacks] = useState(null);

  const [smiley, setSmiley] = useState(0);
  const [frowny, setFrowny] = useState(0);
  const [surprised, setSurprised] = useState(0);
  const [confused, setConfused] = useState(0);

  useRedirectLoggedOut();
  useUserData();
  const user = useSelector(selectUser);

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

    fetch(`/api/feedback?idActivity=${encodeURIComponent(id)}`)
      .then((data) => {
        if (!data.ok) {
          throw Error("could not fetch the data");
        }
        return data.json();
      })
      .then((data) => {
        const feed = data.feedback;
        setFeedbacks(feed);
        feed.forEach((item) => {
          if (item.type === "smiley") setSmiley(prev => prev + 1);
          if (item.type === "frowny") setFrowny(prev => prev + 1);
          if (item.type === "surprised") setSurprised(prev => prev + 1);
          if (item.type === "confused") setConfused(prev => prev + 1);
        })
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //Real time feedbacks
  useEffect(() => {
    supabase
      .channel('public:feedbacks')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'feedbacks' }, payload => {
        setFeedbacks(prev => [...prev, payload.new])
        if (payload.new.type === "smiley") setSmiley(prev => prev + 1);
        if (payload.new.type === "frowny") setFrowny(prev => prev + 1);
        if (payload.new.type === "surprised") setSurprised(prev => prev + 1);
        if (payload.new.type === "confused") setConfused(prev => prev + 1);
      })
      .subscribe()
  }, []);

  //If user is not a professor, redirect to home page
  useEffect(() => {
    if (user && !user.isProffesor) navigate("/");
  }, [user])

  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            WATCH PAGE
          </span>
          <div className="flex md:order-2">
            <a href="/">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                PROFESSOR PAGE
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
        <div className="flex flex-col items-center py-5">
          {loading && <p>Loading...</p>}
          {error && <div>{error}</div>}
          <h5 className="mb-1 text-xl font-medium text-gray-900 py-5">
            TITLE: {curs && curs.title}
          </h5>
          <span className="text-sm text-gray-500 ">
            description: {curs && curs.description}
          </span>
          <span className="text-sm text-gray-500 ">
            code: {curs && curs.code}
          </span>
          <span className="text-sm text-gray-500">
            date start: {curs && curs.date_start}
          </span>
          <span className="text-sm text-gray-500 ">
            date final: {curs && curs.date_final}
          </span>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:max-w-5xl lg:px-8">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg mx-auto my-4 py-4">
            <h1 className="text-center text-xl font-bold">Live Reacts from students</h1>
          </div>

          <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <a href="#" className="group" onClick={() => { handleFeedback("smiley") }}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8 hover:bg-gray-100">
                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/facebook/327/smiling-face-with-smiling-eyes_1f60a.png" alt="Smiley Face" className="h-full w-full object-cover object-center p-10" />
              </div>
              <p className="mt-1 text-lg font-medium text-gray-900 text-center pt-2">Smiley Face</p>
              <p className="text-center">{smiley}</p>
            </a>

            <a href="#" className="group" onClick={() => { handleFeedback("frowny") }}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8 hover:bg-gray-100">
                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/facebook/327/slightly-frowning-face_1f641.png" alt="Frowny Face" className="h-full w-full object-cover object-center p-10" />
              </div>
              <p className="mt-1 text-lg font-medium text-gray-900 text-center pt-2">Frowny Face</p>
              <p className="text-center">{frowny}</p>
            </a>

            <a href="#" className="group" onClick={() => { handleFeedback("surprised") }}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8 hover:bg-gray-100">
                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/facebook/327/face-with-open-mouth_1f62e.png" alt="Surprised Face" className="h-full w-full object-cover object-center p-10" />
              </div>
              <p className="mt-1 text-lg font-medium text-gray-900 text-center pt-2">Surprised Face</p>
              <p className="text-center">{surprised}</p>
            </a>

            <a href="#" className="group" onClick={() => { handleFeedback("confused") }}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8 hover:bg-gray-100">
                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/facebook/327/confused-face_1f615.png" alt="Confused face" className="h-full w-full object-cover object-center p-10" />
              </div>
              <p className="mt-1 text-lg font-medium text-gray-900 text-center pt-2">Confused Face</p>
              <p className="text-center">{confused}</p>
            </a>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative shadow-xl sm:rounded-lg m-2 sm:mx-20 sm:my-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="py-3 px-6">
                Ora
              </th>
              <th scope="col" className="py-3 px-6">
                Feedback
              </th>
            </tr>
          </thead>
          <tbody>
            {feedbacks?.length > 0 ? (
              feedbacks.map((item) => (
                <tr className="bg-white border-b" key={item.id}>
                  <td className="py-4 px-6">{item.created_at}</td>
                  <td className="py-4 px-6">{item.type}</td>
                </tr>
              ))
            ) : (
              <>
                <tr className="bg-white border-b">
                  <td colSpan={6}>No data found</td>
                </tr>
              </>
            )}
            {loading && (
              <tr className="bg-white border-b">
                <td colSpan={6}>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default WatchPage;
