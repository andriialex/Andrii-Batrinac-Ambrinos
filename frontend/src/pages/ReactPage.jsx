import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function ReactPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curs, setCurs] = useState(null)

  const handleLogout = () => {
    async function logout() {
      var response = await fetch("/api/logout");
      const json = await response.json();
      toast.success(json.message, {
        position: "bottom-center",
        autoClose: 2000,
      });
      dispatch(LOGOUT())
      navigate("/login");
    }
    logout()
  }

  useEffect(() => {
    fetch("/api/cursuri")
      .then(data => {
        if (!data.ok) {
          throw Error('could not fetch the data');
        }
        return data.json();
      })
      .then(data => {
        setData(data);
        const curs = data.find(item => item.id == id)
        setCurs(curs)
        setLoading(false)
        setError(null)
      })
      .catch(err => {
        setError(err.message);
        setLoading(false)
      });
  }, []);
  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">REACT PAGE</span>
          <div className="flex md:order-2">
            <a href="/"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >PERSONAL PAGE</button></a>
          </div>
          <div className="flex md:order-2">
            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleLogout}>LOGOUT</button>
          </div>
        </div>
      </nav>
      {/* <div>
        <h1>React Page</h1>
        <p>ID: {id}</p>
      </div> */}

      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto mt-10">
        <div className="flex flex-col items-center pb-10">
          {/* <img src="" className="w-24 h-24 mb-3 rounded-full shadow-lg" alt="Bonnie image" /> */}
          <svg className="w-12 h-24 mb-3 rounded-full shadow-lg fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
          </svg>

          {loading &&
            <p>Loading...</p>}
          {error && <div>{error}</div>}
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{curs && curs.title}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{curs && curs.description}</span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Love it!
            </a>
            <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Love it!
            </a>
            <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Love it!
            </a>
          </div>
        </div>
      </div>

    </>

  );
}

export default ReactPage;