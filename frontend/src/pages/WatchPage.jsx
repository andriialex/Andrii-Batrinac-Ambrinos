import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../features/auth/authSlice";
import supabase from "../utils/configSupabase"

function WatchPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curs, setCurs] = useState(null);
  const [feedbacks, setFeedbacks] = useState(null);

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
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    supabase
      .channel('public:feedbacks')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'feedbacks' }, payload => {
        setFeedbacks(prev => [...prev, payload.new])
      })
      .subscribe()
  }, []);

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

      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl mx-auto mt-10">
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
