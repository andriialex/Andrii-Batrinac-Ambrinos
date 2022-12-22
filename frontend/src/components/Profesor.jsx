import React, { useState } from 'react';
import ProfesorDialog from './ProfesorDialog';

function Profesor() {
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">PROFESSOR PAGE</span>
                    <div className="flex md:order-2">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleOpenPopup}>ADAUGA CURS NOU</button>
                    </div>
                </div>
            </nav>
            {showPopup && (
                <div>
                    <ProfesorDialog></ProfesorDialog>
                    {/* Popup content goes here */}
                    <button onClick={handleClosePopup}>Close</button>
                </div>
            )}
        </>
    );
}

export default Profesor;
