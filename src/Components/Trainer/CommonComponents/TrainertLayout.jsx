import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import TrainerNavBar from "./TrainerNavBar";

function TrainertLayout(props) {
    return (
        <div className="flex flex-col h-dvh">
            <div className='flex-row flex mb-1' >
                <TrainerNavBar/>
            </div>
            <div className="flex flex-col overflow-y-scroll h-full">
                <div className="flex flex-wrap">
                    {<Outlet/>}
                </div>
            </div>
        </div>


    );
}

export default TrainertLayout;