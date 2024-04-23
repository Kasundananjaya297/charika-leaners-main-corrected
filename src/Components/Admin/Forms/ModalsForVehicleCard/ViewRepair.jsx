import React from 'react';
import {Button, Modal} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ViewRepair({show, onHide,vehicleData}) {
    return (
        <Modal show={show} onHide={()=>onHide(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Vehicle Service and Repair</Modal.Title>
            </Modal.Header>
            <Modal.Body className="flex flex-wrap h-96 items-center justify-center overflow-y-scroll flex-row">
                {
                    vehicleData?.vehicleServiceORRepairs?.map((data, i) => (
                        <div className ={(data?.validMonths === 0 ?"bg-red-100 p-4 w-96  items-center text-sm mb-4 rounded overflow-auto":"bg-green-100 p-4 w-96 items-center text-sm mb-4 rounded overflow-auto")} key={i}>
                            <Row className="mb-1">
                                <Col xs={4}>Invoice:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.invoiceNo}
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={4}>Milage:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.milage} Km
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={4}>Serv./Rep. By:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.repairCenter}
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={4}>Started On:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.servicedDate}
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={4}>Started At:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.servicedTime}
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={4}>End On:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.returnTime}
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={4}>End At:</Col>
                                <Col xs={8} className="pl-4">
                                    {data?.returnDate}
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col xs={4}>Total For:</Col>
                                <Col xs={8} className="pl-4">
                                   Rs. {data?.totalAmountForService}
                                </Col>
                            </Row>
                            <Row className='pl-3 mt-3 overflow-auto h-20'>
                                <table className='border-2 border-black overflow-auto h-6'>
                                    <thead>
                                    <tr>
                                        <th className='border border-black px-4 py-2'>Item Name</th>
                                        <th className='border border-black px-4 py-2'>Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data?.itemsORDones?.map((item, i) => (
                                        <tr key={i}>
                                            <td className='border border-black px-4 py-2'>{item?.itemName}</td>
                                            <td className='border border-black px-4 py-2'>{item?.totalAmount}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </Row>
                            <Row className="mt-4">
                                <Button onClick={() => {
                                    window.open(data?.invoiceUrl, '_blank');
                                }}>View Invoice</Button>
                            </Row>
                        </div>
                    ))}
            </Modal.Body>

        </Modal>
    );
}

export default ViewRepair;