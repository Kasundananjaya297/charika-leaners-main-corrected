import React, {useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FaUserEdit} from "react-icons/fa";
import Image from "react-bootstrap/Image";
import {Button, Modal} from "react-bootstrap";
import Swal from "sweetalert2";
import {
    completeSchedule,
    makeBooking,
    makeBookingSave,
    saveStartedLocation,
    trainerCancleSession,
    updateStudentAttendace
} from "../../ApiService/api";
import {Warning} from "@mui/icons-material";


function ModalForViewScheduler({eventDetails,interrupt,setInterrupt,isOtherSessionStarted}) {
console.log("+++++++++++++++++",eventDetails)
    //hook for preview trainer profile photo
    const [showModal, setShowModal] = useState(false)
    //hook for preview vehicle profile photo
    const [showModaTrainer, setShowModalTrainer] = useState(false)
    //hook for edit schedule
    const [errorMsg, setErrorMsg] = useState('')


    useEffect(() => {
        if(eventDetails?.bookingScheduleDTO[0]?.stdID === sessionStorage.getItem('username')){
            setErrorMsg('You have already booked this schedule')
        }
    }, []);
    useEffect(() => {
        if(new Date() >= new Date(eventDetails.start) && sessionStorage.getItem('role') === 'TRAINER'){
            setErrorMsg("You can't cancel this session. This Session Is expired")
        } else if(new Date(new Date().setDate(new Date().getDate() + 2)) >= new Date(eventDetails.start) && sessionStorage.getItem('role') === 'TRAINER'){
            setErrorMsg("You can't Cancel Session Before 48h.")
        }
    }, []);
    const cancelSession = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to cancel this schedule?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await trainerCancleSession(id);
                if (response?.data?.code === "00") {
                    Swal.fire(
                        'Cancelled!',
                        'Your schedule has been cancelled.',
                        'success'
                    )
                    setInterrupt(!interrupt)
                } else {
                    Swal.fire(
                        'Error!',
                        'Something went wrong',
                        'error'
                    )
                }
            }
        })
    }
    //mark student attendance
    const markAttendance = (bookingID,isAttempted) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to mark this student as attended?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, mark it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await updateStudentAttendace({bookingID:bookingID,isCompleted:isAttempted});
                if (response?.data?.code === "00") {
                    Swal.fire(
                        'Marked!',
                        'Student has been marked as attended.',
                        'success'
                    )
                    setInterrupt(!interrupt)
                } else {
                    Swal.fire(
                        'Error!',
                        'Something went wrong',
                        'error'
                    )
                }
            }
        })

    }
    const completeSession = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to complete this session?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, complete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await completeSchedule(eventDetails.schedulerID);
                if (response?.data?.code === "00") {
                    Swal.fire(
                        'Completed!',
                        'Your session has been completed.',
                        'success'
                    )
                    setInterrupt(!interrupt);
                } else {
                    Swal.fire(
                        'Error!',
                        'Something went wrong',
                        'error'
                    )
                }
            }
        })
    }
    //save start location
   const startSession =  () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to start this session?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, start it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async(position) => {
                        const endLatitude = position.coords.latitude;
                        const endLongitude = position.coords.longitude;

                        const datatoSave = {
                            registrationNo: eventDetails.registrationNo,
                            startLatitude: endLatitude,
                            startLongitude: endLongitude,
                            endLatitude: endLatitude,
                            endLongitude: endLongitude,
                            schedulerID: eventDetails.schedulerID,
                        }
                        await saveStartedLocation(datatoSave).then((response) => {
                            if(response?.data?.code === "00"){
                                Swal.fire(
                                    'Started!',
                                    'Your session has been started.',
                                    'success'
                                )
                                setInterrupt(!interrupt);
                            }else{
                                Swal.fire(
                                    'Error!',
                                    'Something went wrong',
                                    'error'
                                )
                            }
                        })
                    });
                }
            }
        })
    };

    return (
        <div>
            <Card>
                <div className="flex  justify-between pl-4 pt-3 w-wrap h-wrap mb-2 w-auto pr-7">
                    <Col xs={1} sm={3}>
                        <div className="flex justify-center rounded-full items-center  w-fit h-fit bg-gray-200 mb-4">
                            <div className=" w-16 h-16 p-2 rounded-full">
                                <Image src={`${eventDetails.vehiclePhoto}`}
                                       style={{width: '100%', height: '100%'}} roundedCircle
                                       onClick={() => {
                                           setShowModal(true)
                                       }}/>
                            </div>
                            <div className=" w-16 h-16 p-2 rounded-full">
                                <Image src={`${eventDetails.trainerPhoto}`}
                                       style={{width: '100%', height: '100%'}} roundedCircle
                                       onClick={() => {
                                           setShowModalTrainer(true)
                                       }}/>
                            </div>
                            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                                <Modal.Body className="text-center">
                                    <Image src={`${eventDetails.vehiclePhoto}`}
                                           style={{maxWidth: '100%', maxHeight: '80vh'}} rounded/>
                                </Modal.Body>
                            </Modal>
                            <Modal show={showModaTrainer} onHide={() => setShowModalTrainer(false)} centered>
                                <Modal.Body className="text-center">
                                    <Image src={`${eventDetails.trainerPhoto}`}
                                           style={{maxWidth: '100%', maxHeight: '80vh'}} rounded/>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </Col>
                </div>
                <Card.Body className="p-4 -mt-8 text-sm">
                    {(eventDetails.isStrated&&(!eventDetails?.isCompleted))&&<div className='text-success italic mb-3 items-center'>Started</div>}
                    {((eventDetails.isStrated)&&(eventDetails?.isCompleted))&&<div className='text-success italic mb-3 items-center'>Completed</div>}
                    {(!eventDetails.isStrated)&&(!eventDetails?.isCompleted)&&(isOtherSessionStarted)&&<div className='text-danger italic mb-3 items-center'>You can't start 2 sessions at same time</div>}
                    <div className='text-danger italic mb-3 items-center'>
                        {(errorMsg)&&<Warning/>}
                        {errorMsg}
                    </div>

                    <Row className="mb-2">
                        <Col xs={4}>Title:</Col>
                        <Col xs={8} className="pl-4">
                            {eventDetails.titleFetch} Session
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4}>Vehicle Class:</Col>
                        <Col xs={8} className="pl-4">
                            {eventDetails.vehicleClass} - {eventDetails.vehicleClassName}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4}>Student Count:</Col>
                        <Col xs={8} className="pl-4">
                            {eventDetails.studentCount}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4}>Remain Count:</Col>
                        <Col xs={8} className="pl-4">
                            {eventDetails.studentCount}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4}>Trainer:</Col>
                        <Col xs={8} className="pl-4">
                            {eventDetails.trainerFname} {eventDetails.trainerLname}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4}>Contact No:</Col>
                        <Col xs={8} className="pl-4">
                            {eventDetails.contactNo}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4}>Vehicle No:</Col>
                        <Col xs={8} className="pl-4">
                            {eventDetails.registrationNo}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={4}>Vehicle:</Col>
                        <Col xs={8} className="pl-4">
                            {eventDetails.make} {eventDetails.model}
                        </Col>
                    </Row>
                    {((eventDetails?.bookingScheduleDTO?.length>0)&&(!eventDetails?.isStrated)&&(!eventDetails?.isCompleted))&&<Row>
                        <Button onClick={()=>{ startSession()}} variant={'outline-success'} disabled={isOtherSessionStarted}>Start Session</Button>
                    </Row>}
                    {((eventDetails?.bookingScheduleDTO?.length>0)&&(eventDetails?.isStrated)&&(!eventDetails?.isCompleted))&&<Row>
                        <Button onClick={()=>{ completeSession()}} variant={'outline-danger'}>Complete Session</Button>
                    </Row>}
                </Card.Body>
                <Card.Body className='bg-gray-50'>
                    <Card.Title>Students</Card.Title>
                    <div className='h-28 overflow-y-scroll'>
                        {eventDetails?.bookingScheduleDTO?.map((request, index) => (
                                <Row key={index} className='flex flex-row items-center justify-center'>
                                    <div className='flex justify-between items-center'>
                                        <div className='mb-1 '>
                                            <div>
                                                {request.stdID} - {request.stdFname} {request.stdLname}
                                            </div>
                                            <div className='text-xs italic'>
                                                {request.telephone} | {request.bookingDate} {request.bookingTime}
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            {<Button variant='outline-success' size='sm' className='mr-3' disabled={((!request?.isCompleted)&&(!eventDetails.isStrated)||(request?.isCompleted)&&(eventDetails.isStrated))}
                                                     onClick={() => {markAttendance(request.bookingID,true)
                                                     }}>
                                                Att
                                            </Button>}
                                            <Button disabled={((!request?.isCompleted)&&(!eventDetails.isStrated)||(request?.isCompleted)&&(eventDetails.isStrated))} variant='outline-danger' size='sm' onClick={()=>{
                                                markAttendance(request.bookingID,false)
                                            }
                                            }
                                            >
                                                n/a
                                            </Button>
                                        </div>
                                    </div>
                                </Row>
                            )
                        )
                        }
                    </div>

                </Card.Body>
            </Card>
            {sessionStorage.getItem("role")==="TRAINER"&&(
                <div className='flex flex-row mt-2 items-end justify-end'>
                    {(!eventDetails.isStrated)&&(errorMsg==='')&&(<Button variant='outline-danger' onClick={()=>{cancelSession(eventDetails?.schedulerID)}} disabled={eventDetails.trainerRequestToCancel}>{(eventDetails.trainerRequestToCancel?"Pending...":"")||"Request to Cancel"}</Button>)}
                </div>
            )}
        </div>
    );
}

export default ModalForViewScheduler;
