import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import TrainerParticipationView from "./TrainerParticipations/TrainerParicipationView";

const TrainerHome = () => {
    const nav = useNavigate();

    useEffect(() => {
        let role = sessionStorage.getItem("role");
        console.log("role: " + role);
        if (!(role === "TRAINER" && sessionStorage.getItem("token") !== null)) {
            nav("/");
        }
    }, [nav]);
    return (
        <div className=''>
            <TrainerParticipationView />
        </div>
    );
};

export default TrainerHome;