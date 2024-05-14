import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import StudentNavBar from "./StudentNavBar";

function StudentLayout(props) {
    return (
        <div className="flex flex-col h-dvh">
            <div className='flex-row flex mb-1' >
                <StudentNavBar/>
            </div>
            <div className="flex flex-col overflow-y-scroll h-full">
                <div className="flex flex-wrap">
                    {<Outlet/>}
                </div>
            </div>
        </div>


    );
}

export default StudentLayout;