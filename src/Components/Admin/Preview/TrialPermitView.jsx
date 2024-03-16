import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Card, Form, Row} from "react-bootstrap";
import {findStudentByID, getTrailPermit} from "../../ApiService/api";
import Swal from "sweetalert2";

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
                console.log("length is"+response2?.data?.content.length)
                //console.log(trialPermit);
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

    return (
        <div className="flex flex-1 justify-center  mt-10 w-screen items-center">
            <Card style={{ width: "40em" }}>
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
                                    <div className="flex flex-col items-center  pr-4">
                                        <table className="border-collapse w-full mt-2">
                                            <thead>
                                            <tr>
                                                <th className="border p-2">
                                                    <label>Vehicle Type</label>
                                                </th>
                                                <th className="border p-2">Manual</th>
                                                <th className="border p-2">Auto</th>
                                                <th className="border p-2">None</th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                            <tr>
                                                <td className="border p-2">
                                                    <label>B1 - Motor Tricycle</label>
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="radio"
                                                        name="b1"
                                                        onChange={() => {
                                                        }}
                                                        checked={data?.b1M}
                                                        disabled={true}
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input type="radio" name="b1" disabled={true}/>
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="radio"
                                                        name="b1"
                                                        defaultChecked={true}
                                                        onChange={() => {
                                                        }}
                                                        disabled={true}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border p-2">
                                                    <label>B - all cars/duel purpose</label>
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="radio"
                                                        name="b"
                                                        onChange={() => {
                                                        }}
                                                        checked={data?.ba}
                                                        disabled={true}
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="radio"
                                                        name="b"
                                                        onChange={() => {
                                                        }}
                                                        checked={data?.bm}
                                                        disabled={true}
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="radio"
                                                        name="b"
                                                        defaultChecked={true}
                                                        onChange={() => {
                                                        }}
                                                        checked={data?.bM}
                                                        disabled={true}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border p-2">
                                                    <label>A1 - Mortorcycle Engine Capacity &lt; 100</label>
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="radio"
                                                        name="A1"
                                                        onChange={() => {
                                                        }}
                                                        checked={data?.a1M}
                                                        disabled={true}
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="radio"
                                                        name="A1"
                                                        onChange={() => {
                                                        }}
                                                        checked={data?.a1A}
                                                        disabled={true}
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="radio"
                                                        name="A1"
                                                        defaultChecked={true}
                                                        onChange={() => {
                                                        }}
                                                        disabled={true}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border p-2">
                                                    <label>A - Mortorcycle Engine Capacity &ge; 100</label>
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="radio"
                                                        name="A"
                                                        onChange={() => {
                                                        }}
                                                        checked={data?.am}
                                                        disabled={true}
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input type="radio" name="A" disabled={true}/>
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="radio"
                                                        name="A"
                                                        defaultChecked={true}
                                                        onChange={() => {
                                                        }}
                                                        disabled={true}
                                                    />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Form>))}
                        </div>
                    </div>
                </Card.Body>
            </Card></div>
    );
}

export default TrialPermitView;