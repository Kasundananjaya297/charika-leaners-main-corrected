import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const StudentHome = () => {
    const nav = useNavigate();

    useEffect(() => {
        let role = sessionStorage.getItem("role");
        console.log("role: " + role);
        if (!(role === "STUDENT" && sessionStorage.getItem("token") !== null)) {
            nav("/");
        }
    }, [nav]);
    return (
        <div className=''>
            Home Screen
        </div>
    );
};

export default StudentHome;