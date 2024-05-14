import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FaUserEdit} from "react-icons/fa";
import Image from "react-bootstrap/Image";
import {Button, Modal} from "react-bootstrap";
import ModalForEditSchedule from "./ModalForEditSchedule";

function ModalForViewScheduler({eventDetails,interrupt,setInterrupt}) {
    //hook for preview trainer profile photo
    const [showModal, setShowModal] = useState(false)
    //hook for preview vehicle profile photo
    const [showModaTrainer, setShowModalTrainer] = useState(false)
    //hook for edit schedule
    const [showModalEditSchedule, setShowModalEditSchedule] = useState(false)

    console.log(eventDetails)

    return (
        <div>
            <Card >
                <div className="flex  justify-between pl-4 pt-3 w-wrap h-wrap mb-2 w-auto pr-7">
                    <FaUserEdit size={24} onClick={()=>{setShowModalEditSchedule(true)}}/>
                    <Col xs={1} sm={3}>
                        <div className="flex justify-center rounded-full items-center  w-fit h-fit bg-gray-200">
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
                    <Row>
                        <Col xs={4}>Vehicle:</Col>
                        <Col xs={8} className="pl-4">
                            {eventDetails.make} {eventDetails.model}
                        </Col>
                    </Row>
                </Card.Body>
                {/*booking requests*/}
                <Card.Body className='bg-gray-50'>
                    <Card.Title>Booking Requests</Card.Title>
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
                                            <Button variant='outline-success' size='sm' className='mr-3'>
                                                Accept
                                            </Button>
                                            <Button variant='outline-danger' size='sm'>
                                                Reject
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
            <Modal show={showModalEditSchedule} onHide={() => {
                setShowModalEditSchedule(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Schedules</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalForEditSchedule eventDetails={eventDetails} interrupt={interrupt} setInterrupt={setInterrupt}
                                          selectedDate={new Date(eventDetails.start)}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalForViewScheduler;
