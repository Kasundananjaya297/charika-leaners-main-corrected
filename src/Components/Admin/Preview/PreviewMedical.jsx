import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Form, Row,CloseButton} from "react-bootstrap";
import {findStudentByID, getMedicalReport} from "../../ApiService/api";
import Swal from "sweetalert2";
import { GrDocumentImage } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";

function PreviewMedical() {
    const location = useLocation();
    const stdID = location.state;
    const [studentData,setStudentData] = useState({});
    const [medical, setMedical] = useState([]);

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
                const response2 =await  getMedicalReport(stdID);
                console.log(response2)
                setStudentData(response?.data?.content);
                setMedical(response2?.data?.content);
            }catch (e){
                Swal.fire({
                    icon: "error",
                    title: "Medical Not Exists",
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
        console.log(medical[0]);
        nav("/studentprofile/medical/edit", { state: medical[0]});
    }

    return (
        <div className="flex flex-1 justify-center  h-screen w-screen items-center">
            <Card style={{ width: "40em" }}>
                <div className='flex items-center justify-between p-3'>
                <CloseButton className=' bg-red-400' onClick={back}/>
                <FaUserEdit size={24} onClick={() => regForm2()}/>
                </div>
            
                <Card.Body>
                    <div className="pl-6 pr-6">
                        <Row>
                            <div className="flex justify-center p-2 bg-neutral-100 rounded-md text-2xl mb-4">
                                Medical Reports
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
                            {medical?.map((data, i) => (
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
                                                <td className="pl-4">{data?.examination}</td>
                                            </tr>
                                            <tr className="text-sm">
                                                <td>Valid months:</td>
                                                {" "}
                                                <td className="pl-4">{data?.validMonths}</td>
                                            </tr>
                                            <tr className="text-sm">
                                                <td>Blood Type:</td>
                                                {" "}
                                                <td className="pl-4">{data?.bloodType}</td>
                                            </tr>
                                        </table>

                                    </div>
                                    <div className="flex flex-col items-center  pr-4">
                                        <table className="border-collapse w-full mt-3 text-sm">
                                        <tbody className="text-sm">
                                    <tr>
                                        <td className="border p-2">
                                            <label>Vission Corrected</label>
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                type="radio"
                                                name="vission"
                                                label="Yes"
                                                checked={data?.visionISCorrected}
                                                required
                                                disabled
                                                
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                type="radio"
                                                name="vission"
                                                label="No"
                                                checked={!data?.visionISCorrected}
                                                required
                                                disabled
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">
                                            <label>Squint</label>
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                type="radio"
                                                name="Squint"
                                                label="Yes"
                                                checked={data?.isSquint}
                                                required
                                                disabled
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                type="radio"
                                                name="Squint"
                                                label="No"
                                                required
                                                checked={!data?.isSquint}
                                                disabled
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">
                                            <label>Hearing</label>
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                name="hearing"
                                                type="radio"
                                                label="Satisfactory"
                                                required
                                                checked={data?.isSatisfactory}
                                                disabled
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                type="radio"
                                                name="hearing"
                                                label="Not-Satisfactory"
                                                required
                                                checked={!data?.isSatisfactory}
                                                disabled
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                        </table>
                                        <Button className='mt-3 w-full hover:to-blue-600' onClick={() => window.open(data?.medicalURL, '_blank')}>
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

export default PreviewMedical;