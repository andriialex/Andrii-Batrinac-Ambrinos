import React, { useState, useEffect } from "react";
import ProfesorDialog from "./ProfesorDialog";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { LOGOUT } from "../features/auth/authSlice";

function Profesor() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [cursEditat, setCursEditat] = useState(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenPopupAdd = () => {
    setShowPopup(true);
  };

  const handleOpenPopupEdit = (event, item) => {
    setCursEditat(item);
    setShowPopupEdit(true);
  };

  const handleClosePopupAdd = () => {
    setShowPopup(false);
  };
  const handleClosePopupEdit = () => {
    setShowPopupEdit(false);
  };

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
            PROFESSOR PAGE
          </span>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleOpenPopupAdd}
            >
              ADAUGA CURS NOU
            </button>
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
      {showPopup && (
        <div>
          <ProfesorDialog
            onClose={handleClosePopupAdd}
            mode={"add"}
          ></ProfesorDialog>
        </div>
      )}
      {showPopupEdit && (
        <div>
          <ProfesorDialog
            onClose={handleClosePopupEdit}
            mode={"edit"}
            item={JSON.stringify(cursEditat)}
          ></ProfesorDialog>
        </div>
      )}

      <div className="overflow-x-auto relative shadow-xl sm:rounded-lg m-2 sm:mx-20 sm:my-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="py-3 px-6">
                Titlu
              </th>
              <th scope="col" className="py-3 px-6">
                Descriere
              </th>
              <th scope="col" className="py-3 px-6">
                Cod
              </th>
              <th scope="col" className="py-3 px-6">
                Data si ora start
              </th>
              <th scope="col" className="py-3 px-6">
                Data si ora final
              </th>
              <th scope="col" className="py-3 px-6">
                Actiuni
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item) => (
                <tr
                  className="bg-white border-b"
                  key={item.id}
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.title}
                  </th>
                  <td className="py-4 px-6">{item.description}</td>
                  <td className="py-4 px-6">{item.code}</td>
                  <td className="py-4 px-6">{item.date_start}</td>
                  <td className="py-4 px-6">{item.date_final}</td>
                  <td className="py-4 px-6">
                    <button
                      className="font-medium text-blue-600 hover:underline"
                      onClick={(event) => handleOpenPopupEdit(event, item)}
                    >
                      Edit
                    </button>
                    <a
                      href={`/watch/${item.id}`}
                      className="font-medium text-red-500 px-0 sm:p-2 sm:mx-5 hover:bg-red-600 hover:rounded-3xl hover:text-white"
                    >
                      Reactii live
                    </a>
                  </td>
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
            {error && <div>{error}</div>}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Profesor;
