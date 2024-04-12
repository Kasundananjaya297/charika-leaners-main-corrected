import React, {useEffect} from 'react'
import { Col, Row ,Card, Table} from 'react-bootstrap'
import { FaUserEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {checkCurrentAgreementIsExpired, saveAgreement} from "../../ApiService/api";
import Swal from "sweetalert2";


export default function PackageCardForModel({packeData,setPackgeID,stdID,setInterrupt,interrupt}){
    const nav = useNavigate();
    const packDataEdit=(data) =>{
        nav(`/Packages/editPackage`,{state:data})
    }

    const SaveStudentData = async (stdID,price,packID, )=>{
        const data = {
            stdID:stdID,
            packageID:packID,
            packagePrice:price,
            agreementDate:new Date().toISOString().slice(0, 10),
            isFinished:false
        }
        console.log(data)
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "Going to save details",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await saveAgreement(data);
                    if (response?.data?.code === "00") {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Successfully saved",
                        });
                    } else if(response?.data?.code === "06"){
                        Swal.fire({
                            icon: "error",
                            title: "Already selected",
                            text: "Failed to save",
                        });
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to save",
                    });
                }
            }
        });
    }
  return (
    <div>
         <Row className="flex text-sm item-center">
            <Col sm={12} md={6} lg={4}>
                <Card style={{ width: "25rem", height:"30em"}}>
                <div className="flex  justify-between pr-1 pl-5 pt-3 w-wrap h-wrap mb-2 " >
                <FaUserEdit size={24} onClick={() => packDataEdit(packeData)}/>
                </div>
                    <div className="flex pl-4 items-center justify-center pt-3 w-wrap h-div">
                        <Card.Body className="p-1">
                            <Row className="mb-2">
                                <Col xs={5}>Package ID:</Col>
                                <Col xs={4} className="pl-2">
                                    {packeData?.packageID}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={5}>Package Name:</Col>
                                <Col xs={4} className="pl-2 font-bold">
                                    {packeData?.packageName}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={5}>Specific For:</Col>
                                <Col xs={4} className="pl-2">
                                    {packeData?.description}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={5}>Price:</Col>
                                <Col xs={4} className="pl-2">
                                    Rs.{packeData?.packagePrice}
                                </Col>
                            </Row>
                            <Row className='flex items-center justify-center flex-row'>
                                <Col className='mb-2'>Lessons: *</Col>
                                <div className='flex flex-col gap-y-1 h-32'>
                                    <div className='pb-4 overflow-auto'>
                                        <div class='overflow-hidden border border-gray-200 rounded-lg mr-6'>
                                            <div class='overflow-y-auto  '>
                                                <table class='min-w-full divide-y'>
                                                    <thead class='bg-gray-50'>
                                                    <tr>
                                                        <th class='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                                                        <th class='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                                                        <th class='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Count</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody class='bg-white divide-y divide-gray-200'>
                                                    {packeData.packageAndVehicleType?.map((data, i) => (
                                                        <tr key={i}>
                                                            <td class='px-3 py-2 whitespace-nowrap'>{data?.typeID} - {data?.typeName}</td>
                                                            <td class='px-3 py-2 whitespace-nowrap'>{data?.autoOrManual}</td>
                                                            <td class='px-3 py-2 whitespace-nowrap'>{data?.lessons}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            <Row className="flex mt-3">
                                <div>
                                    <button className="btn btn-primary"
                                            onClick={() => {
                                                SaveStudentData(stdID, packeData?.packagePrice, packeData?.packageID);
                                                setInterrupt(!interrupt);
                                            }}>Select
                                    </button>
                                </div>
                            </Row>
                        </Card.Body>
                    </div>
                </Card>
            </Col>
         </Row>
    </div>
  )
}
