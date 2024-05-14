import React, { useEffect, useState } from 'react';
import { findStudentByID } from '../../ApiService/api';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile(props) {
    const [studentData, setStudentData] = useState({});

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
                            <div className="text-center mb-4">
                                <Image
                                    src={studentData?.profilePhotoURL}
                                    roundedCircle
                                    width={150}
                                    alt="Profile Photo"
                                />
                            </div>
                            <Card.Text>
                                <p><strong>Name:</strong> {studentData?.fname} {studentData?.lname}</p>
                                <p><strong>Email:</strong> {studentData?.email}</p>
                                <p><strong>Phone:</strong> {studentData?.telephone}</p>
                                <p><strong>Address:</strong> {studentData?.addressNo}, {studentData?.adl1}, {studentData?.adl2}, {studentData?.city}</p>
                                <p><strong>Date of Birth:</strong> {studentData?.dateOfBirth}</p>
                                <p><strong>NIC:</strong> {studentData?.nic}</p>
                                <p><strong>Age:</strong> {studentData?.age}</p>
                                <p><strong>Guardian Name:</strong> {studentData?.guardianName}</p>
                                <p><strong>Guardian Phone:</strong> {studentData?.guardianTelephone}</p>
                                <p><strong>Full Payment:</strong> {studentData?.fullPayment}</p>
                                <p><strong>Balance:</strong> {studentData?.balance}</p>
                                <p><strong>Registration Status:</strong> {studentData?.registrationStatus ? 'Registered' : 'Not Registered'}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;
