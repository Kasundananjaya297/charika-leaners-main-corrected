import React, { useEffect, useState } from 'react';
import { getTrainerByID} from '../../ApiService/api';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Settings} from "@mui/icons-material";
import {Modal} from "react-bootstrap";
import ChangePassword from "./ChangePassword";

function TrainerProfile(props) {
    const [trainerData, setTrainerData] = useState({});
    const [showModalPaymentHistory, setShowModalPaymentHistory] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalChangePassword, setShowModalChangePassword] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const trainerID = sessionStorage.getItem('username');
            console.log("userName"+trainerID);
            const response = await getTrainerByID(trainerID);
            setTrainerData(response.data?.content);
            console.log(response.data?.content);
        };
        fetch();
    }, []);





    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title>Personal Details</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Image
                                src={trainerData?.profilePhotoURL}
                                roundedCircle
                                height={100}
                                width={100}
                                onClick={() => setShowModal(true)}
                            />
                            <Modal show={showModal} onHide={()=>{setShowModal(false)}}>
                                    <Image src={trainerData?.profilePhotoURL}/>
                            </Modal>
                            <Card.Text className='mt-4'>
                                <p><strong>Name:</strong> {trainerData?.fname} {trainerData?.lname}</p>
                                <p><strong>Email:</strong> {trainerData?.email}</p>
                                <p><strong>Phone:</strong> {trainerData?.telephone}</p>
                                <p><strong>Address:</strong> {trainerData?.addressNo}, {trainerData?.adl1}, {trainerData?.adl2}, {trainerData?.city}</p>
                                <p><strong>Date of Birth:</strong> {trainerData?.dateOfBirth}</p>
                                <p><strong>NIC:</strong> {trainerData?.nic}</p>
                                <p><strong>Age:</strong> {trainerData?.age}</p>
                                <Button onClick={()=>{setShowModalChangePassword(true)}}>
                                    <div className='flex flex-row items-center gap-x-2'>
                                        <div>
                                            <Settings/>
                                        </div>
                                        <div>
                                            Change Password
                                        </div>
                                    </div>
                                </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showModalChangePassword} onHide={()=>{setShowModalChangePassword(false)}}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <ChangePassword />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default TrainerProfile;
