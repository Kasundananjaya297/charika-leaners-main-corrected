import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Form, Row,CloseButton} from "react-bootstrap";
import {findStudentByID, getTrailPermit} from "../../ApiService/api";
import Swal from "sweetalert2";
import { GrDocumentImage } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";

function TrialPermitView() {
    const location = useLocation();
    const stdID = location.state;
    const [studentData,setStudentData] = useState({});
    const [trialPermit, setTrailPermit] = useState([]);

    const nav = useNavigate();
    useEffect(() => {
        let role = sessionStorage.getItem("role");
        console.log("role: " + role);
        if (!(role === "ADMIN" && sessionStorage.getItem("token") !== null)) {
            nav("/");
        } else if (stdID === null) {
            nav("/studentprofile");
        }
    }, [nav]);

    useEffect(() => {
        let role = sessionStorage.getItem("role");
        if ((role === "ADMIN" && sessionStorage.getItem("token") !== null)){
            const getStudentData = async ()=>{
            try{
                const response= await findStudentByID(stdID);
                const response2 =await  getTrailPermit(stdID);
                setStudentData(response?.data?.content);
                setTrailPermit(response2?.data?.content);
                console.log(trialPermit);
            }catch (e){
                Swal.fire({
                    icon: "error",
                    title: "Trial Permit Not Exists",
                })
                nav("/studentprofile")
            }
        }
            getStudentData(stdID);}

    }, [stdID]);
    const back =() =>{
        nav("/studentprofile");
    }
    const regForm2 = () => {
        nav("/studentprofile/trail/edit", { state: trialPermit});
    }

    return (
        <div className="flex flex-1 justify-center  h-screen w-screen items-center">
            <Card style={{ width: "40em" }}>
                <div className='flex items-center justify-between p-3'>
                <CloseButton className=' bg-red-400' onClick={back}/>
                <FaUserEdit size={24} onClick={() => regForm2()} className=' cursor-pointer'/>
                </div>
            
                <Card.Body>
                    <div className="p-4">
                        <Row>
                            <div className="flex justify-center p-2 bg-neutral-100 rounded-md text-2xl mb-4">
                                Trail Permit
                            </div>
                        </Row>

                        <div className="bg-slate-100 w-fit p-3 rounded-md mb-3 text-sm">
                            <table className="gap-y-1">
                                <tr className="">
                                    <td>Student ID:</td>
                                    {" "}
                                    <td className="pl-4">{studentData?.stdID}</td>
                                </tr>
                                <tr className="">
                                    <td>Name:</td>
                                    {" "}
                                    <td className="pl-4">
                                        {studentData?.fname} {studentData?.lname}
                                    </td>
                                </tr>
                                <tr className="">
                                    <td>NIC:</td>
                                    <td className="pl-4">{studentData?.nic}</td>
                                </tr>
                                <tr className="">
                                    <td>Contact:</td>
                                    {" "}
                                    <td className="pl-4">{studentData?.telephone}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="flex-column overflow-scroll w-full h-96">
                            {trialPermit?.map((data, i) => (
                                <Form className={i===0?"bg-green-100 p-4 mt-4 rounded":"bg-red-100 p-4 mt-4 rounded"} key={i}>
                                    <div className="mb-0 mt-3" >
                                        <div className=" mb-2 font-bold "> Details Of leaner permit</div>
                                        <table className="ml-2">
                                            <tr className="text-sm">
                                                <td>Serial No:</td>
                                                {" "}
                                                <td className="pl-4">{data?.serialNo}</td>
                                            </tr>
                                            <tr className="text-sm">
                                                <td>Exam Date:</td>
                                                {" "}
                                                <td className="pl-4">{data?.examDate}</td>
                                            </tr>
                                            <tr className="text-sm">
                                                <td>Expire Date:</td>
                                                {" "}
                                                <td className="pl-4">{data?.expDate}</td>
                                            </tr>
                                        </table>

                                    </div>
                                    <div className="flex flex-col items-center">
                                        <table className="border-collapse w-full mt-2">
                                            <thead>
                                            <tr>
                                                <th className="border p-2">
                                                    <label>Category_ID</label>
                                                </th>
                                                <th className="border p-2">Category</th>
                                                <th className="border p-2">Capacity</th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                            {data?.permitAndVehicleType?.map((dt,i)=>(
                                            <tr key={i}>
                                                <td className="border p-2">{dt?.selectedType} </td>
                                                <td className="border p-2">{dt?.description}</td>
                                                <td className="border p-2">{dt?.engineCapacity}</td>
                                            </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        <Button className='mt-3 w-full hover:to-blue-600' onClick={() => window.open(data?.downURL, '_blank')}>
                                            <div className='flex items-center justify-center gap-x-3'>
                                                <div><GrDocumentImage /></div>
                                                <div>View</div>
                                            </div></Button>
                                    </div>
                                </Form>))}
                        </div>
                    </div>
                </Card.Body>
            </Card></div>
    );
}

export default TrialPermitView;