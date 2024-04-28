import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";

function TrainerLicenceView({data}) {
    return (
        <div className="flex items-center justify-center flex-col">
            {data?.map((data, i) => (
                <div className={(data?.monthsForExpiireHevyDuty===0||data?.monthsForExpireLightWeight===0?"bg-red-100 p-4 w-96  items-center text-sm mb-4 rounded overflow-auto":"bg-green-100 p-4 w-96  items-center text-sm mb-4 rounded overflow-auto")} key={i}>
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
                    {data?.monthsForExpiireHevyDuty !==-1 && i === 0 &&<Row className="mb-1">
                        <Col xs={4}>Valid_Heavy:</Col>
                        <Col xs={8}>
                            {parseInt(data?.monthsForExpiireHevyDuty/12)} Years {data?.monthsForExpiireHevyDuty%12} Months {data?.monthsForExpiireHevyDuty===0 ? (data?.daysForExpireHeavyDuty + " Days") : ""}
                        </Col>
                    </Row>}
                    {i === 0 &&
                        <Row>
                            <Col xs={4}>Valid_Light:</Col>
                            <Col xs={8}>
                                {parseInt(data?.monthsForExpireLightWeight/12)} Years {data?.monthsForExpireLightWeight%12} Months
                            </Col>
                        </Row>}
                    <Row className='pl-3 mt-3 overflow-auto h-28'>
                        <table className='border-2 border-black overflow-auto h-28'>
                            <thead>
                            <tr>
                                <th className='border border-black px-4 py-2'>Class</th>
                                <th className='border border-black px-4 py-2'>Class Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.trainerDrivingLicenceVehicles?.map((item, i) => (
                                <tr key={i}>
                                    <td className='border border-black px-4 py-2'>{item?.typeID}</td>
                                    <td className='border border-black px-4 py-2'>{item?.typeName}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Row>
                    <Row className='mb-1 pl-4'>
                        <Row className="mt-4 items-center justify-center">
                            <Button onClick={() => {
                                window.open(data?.licenceURL, '_blank');
                            }}>Licence View</Button>
                        </Row>
                    </Row>
                </div>
            ))}
        </div>


    );
}


export default TrainerLicenceView;