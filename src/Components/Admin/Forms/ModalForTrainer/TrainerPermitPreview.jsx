import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";

function TrainerPermitPreview({datas}) {
    return (
        <div className="flex items-center justify-center flex-col">
            {datas?.trainerPermits?.map((data, i) => (
                <div className={(data?.trainerPermitValidMonths===0?"bg-red-100 p-4 w-96  items-center text-sm mb-4 rounded overflow-auto":"bg-green-100 p-4 w-96  items-center text-sm mb-4 rounded overflow-auto")} key={i}>
                    <Row className="mb-1">
                        <Col xs={4}>Trainer ID:</Col>
                        <Col xs={8} className="">
                            {data?.trainerID}
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col xs={4}>Updated/issued:</Col>
                        <Col xs={8} className="">
                            {data?.updatedOrIssuedOn}
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col xs={4}>Expiry Date:</Col>
                        <Col xs={8} className="">
                            {data?.expiryDate}
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col xs={4}>Valid Month:</Col>
                        <Col xs={8} className="">
                            {data?.trainerPermitValidMonths}
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Button onClick={() => {
                            window.open(data?.licenceURL, '_blank');
                        }}>View Trainer Permit</Button>
                    </Row>

                </div>
            ))}

        </div>
    );
    // "updatedOrIssuedOn": "2023-01-30",
    //     "expiryDate": "2025-01-30",
    //     "licenceURL": "https://firebasestorage.googleapis.com/v0/b/charikaleaners.appspot.com/o/trainer%2FT-105%2FtrainerPermit%2F1.avif?alt=media&token=b81f9770-31c9-4ab0-a703-42ecd18bd532",
    //     "trainerID": "T-105"
}

export default TrainerPermitPreview;