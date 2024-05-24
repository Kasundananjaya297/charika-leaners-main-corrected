import React, { useEffect, useState } from 'react';
import {findStudentByID, getAgreement, getPaymentDetails} from '../../ApiService/api';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bolt, Settings} from "@mui/icons-material";
import {Modal} from "react-bootstrap";
import PaymentHistory from "../../Admin/Common/PaymentHistory";
import ChangePassword from "./ChangePassword";

function TrainerProfile(props) {
    const [studentData, setStudentData] = useState({});
    const [packData, setPackData] = useState([]);
    const [amount, setPayment] = useState(0);
    const [payments,setPayments] = useState([]);
    const [showModalPaymentHistory, setShowModalPaymentHistory] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalChangePassword, setShowModalChangePassword] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const stdID = sessionStorage.getItem('username');
            console.log(stdID);
            const response = await findStudentByID(stdID);
            setStudentData(response.data?.content);
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
                                src={studentData?.profilePhotoURL}
                                roundedCircle
                                height={100}
                                width={100}
                                onClick={() => setShowModal(true)}
                            />
                            <Modal show={showModal} onHide={()=>{setShowModal(false)}}>
                                    <Image src={studentData?.profilePhotoURL}/>
                            </Modal>
                            <Card.Text className='mt-4'>
                                <p><strong>Name:</strong> {studentData?.fname} {studentData?.lname}</p>
                                <p><strong>Email:</strong> {studentData?.email}</p>
                                <p><strong>Phone:</strong> {studentData?.telephone}</p>
                                <p><strong>Address:</strong> {studentData?.addressNo}, {studentData?.adl1}, {studentData?.adl2}, {studentData?.city}</p>
                                <p><strong>Date of Birth:</strong> {studentData?.dateOfBirth}</p>
                                <p><strong>NIC:</strong> {studentData?.nic}</p>
                                <p><strong>Age:</strong> {studentData?.age}</p>
                                <p><strong>Guardian Name:</strong> {studentData?.guardianName}</p>
                                <p><strong>Guardian Phone:</strong> {studentData?.guardianTelephone}</p>
                                <p><strong>Full Payment:</strong>  Rs.{ studentData?.fullPayment}</p>
                                <p className='flex items-center'><strong>Remain Payment: </strong> Rs. {studentData?.balance}
                                    <Button variant='link' onClick={()=>{setShowModalPaymentHistory(true)}}>View</Button>
                                </p>
                                <p>
                                    <strong>Registration Status:</strong> {studentData?.registrationStatus ? 'Registered' : 'Not Registered'}
                                </p>
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
            <Modal show={showModalPaymentHistory} onHide={()=>setShowModalPaymentHistory(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PaymentHistory data={studentData} packageData={packData} setShowModal={setShowModalPaymentHistory} />
                </Modal.Body>
            </Modal>
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
