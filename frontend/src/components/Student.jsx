import React, { useState, useEffect } from 'react';

function Student() {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

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
                              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">STUDENT PAGE</span>
                              <div className="flex md:order-2">
                                    <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleLogout}>LOGOUT</button>
                              </div>
                        </div>
                  </nav>

                  <form >
                        <div className="overflow-hidden shadow sm:rounded-md mx-5 mb-5">
                              <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                          <div className="col-span-6 sm:col-span-3">
                                                <input type="text" name="cod" id="cod" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12" required placeholder='Cod curs' />
                                          </div>
                                          <div className="col-span-6 sm:col-span-3 flex items-center justify-center">
                                                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mx-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Inscrie-te la un curs nou</button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </form>


                  <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-2 sm:mx-20">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                    {data?.length > 0 ? data.map((item) => (
                                          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={item.id}>
                                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                      {item.title}
                                                </th>
                                                <td className="py-4 px-6">
                                                      {item.description}
                                                </td>
                                                <td className="py-4 px-6">
                                                      {item.code}
                                                </td>
                                                <td className="py-4 px-6">
                                                      {item.date_start}
                                                </td>
                                                <td className="py-4 px-6">
                                                      {item.date_final}
                                                </td>
                                                <td className="py-4 px-6">
                                                      smile | sad | ??
                                                </td>
                                          </tr>
                                    )) : <>
                                          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                <td colSpan={6}>No data found</td>
                                          </tr>
                                    </>}
                                    {loading &&
                                          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                <td colSpan={6}>Loading...</td>
                                          </tr>}
                                    {error && <div>{error}</div>}
                              </tbody>
                        </table>
                  </div>

            </>
      )
}

export default Student;