import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import QRCode from 'react-qr-code';
import { Button } from 'react-bootstrap';

const StudentCredential = ({ data }) => {
    const printInvoice = () => {
        window.print();
    };

    return (
        <div
            className='bg-light text-dark border rounded p-4 ml-10 mt-3 d-flex flex-column align-items-center'
            style={{ width: '210mm', padding: '20mm' }}>
            {(data?.generatedPassword !== "" ? (<div>
                <Row className="mb-3">
                    <Col xs={6}>
                        <div>
                            <h6 className="font-weight-bold">From:</h6>
                            <p>Charika Learners</p>
                            <p>Athurugiriya</p>
                            <p>10250</p>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div>
                            <h6 className="font-weight-bold">To:</h6>
                            <p><span className="font-weight-bold">Student ID:</span> {data?.trainerID}</p>
                            <p><span className="font-weight-bold">NIC:</span> {data?.nic}</p>
                            <p><span className="font-weight-bold">Name:</span> {data?.fname} {data?.lname}
                            </p>
                            <p><span
                                className="font-weight-bold">Address:</span> {data?.addressNo}, {data?.adl1}, {data?.adl2}, {data?.city}
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Col xs={6} className="d-flex flex-column align-items-center">
                        <QRCode value={data?.generatedPassword}/>
                        <Button variant="primary" className="mt-3" onClick={printInvoice}>Print</Button>
                    </Col>
                </Row>
            </div>):"Credential Already Generated or Changed, If you want to Regenerate use Reset button")}
        </div>
    );
};

export default StudentCredential;
