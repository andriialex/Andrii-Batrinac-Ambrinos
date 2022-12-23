import React, { useState, useEffect } from 'react';
import ProfesorDialog from './ProfesorDialog';

function Profesor() {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupEdit, setShowPopupEdit] = useState(false);

    const handleOpenPopupAdd = () => {
        setShowPopup(true);
    };

    const handleOpenPopupEdit = () => {
        setShowPopupEdit(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowPopupEdit(false);
    };

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            fetch("http://localhost:3000/get-cursuri", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "idUser": 1
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.activities);
                })
                .catch((error) => {
                    console.log(error);
                });
            // const json = await response.json();
            // setData(json);
            // console.log(this.data)
        }

        fetchData();
    });

    return (
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">PROFESSOR PAGE</span>
                    <div className="flex md:order-2">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleOpenPopupAdd}>ADAUGA CURS NOU</button>
                    </div>
                </div>
            </nav>
            {showPopup && (
                <div>
                    <ProfesorDialog onClose={handleClosePopup} mode={'add'}></ProfesorDialog>
                </div>
            )}
            {showPopupEdit && (
                <div>
                    <ProfesorDialog onClose={handleClosePopup} mode={'edit'}></ProfesorDialog>
                </div>
            )}

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-2 sm:mx-20">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Product name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Color
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Category
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="py-4 px-6">
                                Sliver
                            </td>
                            <td className="py-4 px-6">
                                Laptop
                            </td>
                            <td className="py-4 px-6">
                                $2999
                            </td>
                            <td className="py-4 px-6">
                                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={handleOpenPopupEdit}>Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Profesor;
