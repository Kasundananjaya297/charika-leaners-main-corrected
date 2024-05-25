import React, {useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {FaUserEdit} from "react-icons/fa";
import Image from "react-bootstrap/Image";
import {Button, Modal} from "react-bootstrap";
import TrainerLicence from "../Forms/ModalForTrainer/TrainerLicence";
import TrainerLicenceView from "../Forms/ModalForTrainer/TrainerLicenceView";
import TrainerPermit from "../Forms/ModalForTrainer/TrainerPermit";
import TrainerPermitPreview from "../Forms/ModalForTrainer/TrainerPermitPreview";
import StudentCredential from "./StudentCredential";
import {adminResetPassword} from "../../ApiService/api";
import Swal from "sweetalert2";
import TrainerCredential from "./TrainerCredential";
import TrainerParicipationView from "./TrainerParicipationView";


function TrainerCard({data,interrupt, setInterrupt}) {
    console.log("TrainerCard",data)
    const [showModal,setShowModal] = useState(false);

    //modal for trainer licence
     const [showLicenceModal, setShowLicenceModal] = useState(false);
     //modal for trainer licence View
    const [showLicenceViewModal, setShowLicenceViewModal] = useState(false);
    //modal for trainer permit
    const [showPermitModal, setShowPermitModal] = useState(false);
    //show modal for preiew trainer permit
    const [showModalTrainerPermit, setShowModalTrainerPermit] = useState(false);
    //show modal for preview trainer credential
    const [showModalTrainerCredential, setShowModalTrainerCredential] = useState(false);
    //show modal trainer participation
    const [showModalTrainerParticipation, setShowModalTrainerParticipation] = useState(false);
    //reset password
    const changePassword = async () => {
        const userData={
                username:data?.trainerID ,
                password: "",
                role: "",
                isActive: true,
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to reset the password of this Trainer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Reset'
        }).then(async (result) => {
           try{
               if(result.isConfirmed) {
                  const response =await adminResetPassword(userData);
                  if(response?.data?.code ==="00"){
                      Swal.fire(
                          'Reset!',
                          'Password Reset Successfully',
                          'success'
                      )
                  }
                  setInterrupt(!interrupt);
               }
           }catch (e){
                Swal.fire(
                     'Error!',
                     'Something went wrong',
                     'error'
                )
           }

        })
    }
    return (
        <div>
            <Row className="flex overflow-hidden text-sm item-center ">
                <Col sm={12} md={6} lg={4}>
                    <Card style={{width: "25rem"}}>
                        <div className="flex  justify-between pr-1 pl-5 pt-3 w-wrap h-wrap mb-2">
                            <FaUserEdit size={24} onClick={""}/>
                            <Col xs={1} sm={3}>
                                <div className="flex justify-center rounded-full items-center  w-fit h-fit bg-gray-200">
                                    <div className=" w-16 h-16 p-2 rounded-full">
                                        <Image src={`${data?.profilePhotoURL}`}
                                               style={{width: '100%', height: '100%'}} roundedCircle
                                               onClick={() => {
                                                   setShowModal(true)
                                               }}/>
                                    </div>
                                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                                        <Modal.Body className="text-center">
                                            <Image src={`${data?.profilePhotoURL}`} style={{ maxWidth: '100%', maxHeight: '80vh' }} rounded />
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </Col>
                        </div>
                        <Card.Body className="p-4">
                            <Row className="mb-2">
                                <Col xs={4}>Trainer ID:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.trainerID}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Name:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.fname} {data?.lname}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Email:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.email}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Telephone:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.telephone}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Address:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.addressNo} {data?.adl1},{" "}
                                    {data?.adl2}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>City:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.city}
                                </Col>
                            </Row>
                            <Row className="mb-2 items-center flex">
                                <Col xs={4}>NIC:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.nic}
                                    <Button className='ml-4' variant='link' size='sm' onClick={()=>{window.open(data?.nicURL, '_blank');}}>View</Button>
                                </Col>
                            </Row>
                            <Row className='mb-2'>
                                <Col xs={4}>Age:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.age}
                                </Col>
                            </Row>
                            <Row className='mb-2'>
                                <Col xs={4}>Dr. Licence ID:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.licenceNo}
                                </Col>
                            </Row>
                            <Row className='mb-2'>
                                <Col xs={4}>Dr. Issued on:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.licenceIssuedOn}
                                </Col>
                            </Row>
                            <Row className='mb-2'>
                                <Col xs={4}>Tr. Licence ID:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.trainerLicenceID}
                                </Col>
                            </Row>
                            <Row className='mb-2'>
                                <Col xs={4}>Tr. Issued on:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.trainerLicenceIssuedON}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Blood Type:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.bloodType}
                                </Col>
                            </Row>
                            <Row className="mb-2 items-center">
                                <Col xs={4}>Trainer Status:</Col>
                                <Col xs={8} className="pl-4">
                                    <Button size={'sm'} disabled={true}>{data?.trainerStatus}</Button>
                                </Col>
                            </Row>
                            <Row className="mb-2">

                            </Row>
                            <Row className='mb-2 items-center'>
                                <Col xs={4}>Driv. Licence:</Col>
                                <Col xs={8} className="pl-4">
                                    <Button size='sm' variant='outline-success' onClick={()=>{setShowLicenceModal(true)}}>Add</Button>
                                    <Button size='sm' variant='link' className='ml-4' onClick={()=>{setShowLicenceViewModal(true)}}>View</Button>
                                </Col>
                            </Row>
                            <Row className='mb-2 items-center'>
                                <Col xs={4}>Train. Permit:</Col>
                                <Col xs={8} className="pl-4">
                                    <Button size='sm' variant='outline-success' onClick={()=>{setShowPermitModal(true)}}>Add</Button>
                                    <Button size='sm' variant='link' className='ml-4' onClick={()=>{setShowModalTrainerPermit(true)}}>View</Button>
                                </Col>
                            </Row>
                            <Row className='mb-2 items-center'>
                                <Col xs={4}>Participation:</Col>
                                <Col xs={8} className="pl-4">
                                    <Button size='sm' variant='outline-success' onClick={()=>{setShowModalTrainerParticipation(true)}}>View</Button>
                                </Col>
                            </Row>
                            <Row className='mb-2 items-center'>
                                <Col xs={4}>Tr. Credential:</Col>
                                <Col xs={8} className="pl-4">
                                  <Button size='sm' variant='outline-danger' onClick={changePassword}>Reset</Button>
                                 <Button size='sm' variant='link' className='ml-4' onClick={()=>{setShowModalTrainerCredential(true)}}>View</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showLicenceModal} onHide={()=>{setShowLicenceModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Trainer Licence</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TrainerLicence trainerID ={data?.trainerID} trainerData={data}/>
                </Modal.Body>
            </Modal>
            <Modal show={showLicenceViewModal} onHide={()=>{setShowLicenceViewModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>View Trainer Licence</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex flex-wrap h-96 items-center justify-center overflow-y-scroll flex-row'>
                    <TrainerLicenceView data={data?.trainerDrivingLicences}/>
                </Modal.Body>
            </Modal>
            <Modal show={showPermitModal} onHide={()=>{setShowPermitModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Trainer Permit</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex flex-wrap h-96 items-center justify-center overflow-y-scroll flex-row'>
                    <TrainerPermit data={data}/>
                </Modal.Body>
            </Modal>
            <Modal show={showModalTrainerPermit} onHide={()=>{setShowModalTrainerPermit(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>View Trainer Permit</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex flex-wrap h-96 items-center justify-center overflow-y-scroll flex-row'>
                    <TrainerPermitPreview datas = {data} />
                </Modal.Body>
            </Modal>
            <Modal show={showModalTrainerCredential} onHide={()=>{setShowModalTrainerCredential(false)}} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Trainer Credentials</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex items-center justify-center'>
                    <TrainerCredential data={data} />
                </Modal.Body>
            </Modal>
            <Modal show={showModalTrainerParticipation} onHide={()=>{setShowModalTrainerParticipation(false)}} size={'xl'}>
                <Modal.Header closeButton>
                    <Modal.Title>Trainer Participation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TrainerParicipationView bookingData={data}/>
                </Modal.Body>
            </Modal>
        </div>

    );
}
export default TrainerCard;