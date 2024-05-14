import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";


const Invoice = ({ data, packageData }) => {
    const [studentData, setStudentData] = useState(data);
    const [packData, setPackData] = useState(packageData);
    const [amount, setPayment] = useState(0);

    console.log(packData[0])

    const printInvoice = () => {
        window.print();
    };

    return (
        <div className='bg-gray-50 text-sm border rounded p-4 gap-y-4 ml-10 mt-3 items-center justify-center flex flex-col w-full' style={{ width: '210mm', padding: '20mm' }}>
            {packData[0]?.totalAmountPaid > 0 && packData[0]?.generatedPassword ?
                <div>
                <Row className="flex flex-row justify-between w-full mb-3">
                    <Col xs={6}>
                        <div>
                            <h6 className="font-bold">From:</h6>
                            <p>Charika Learners</p>
                            <p>Athurugiriya</p>
                            <p>10250</p>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div>
                            <h6 className="font-bold">To:</h6>
                            <p><span className="font-semibold">Student ID:</span> {studentData?.stdID}</p>
                            <p><span className="font-semibold">NIC:</span> {studentData?.nic}</p>
                            <p><span className="font-semibold">Customer:</span> {studentData?.fname} {studentData?.lname}</p>
                            <p><span className="font-semibold">Address:</span> {studentData?.addressNo}, {studentData?.adl1}, {studentData?.adl2} {studentData?.city}</p>
                            <p><span className="font-semibold">Pack Name:</span>{packData[0]?.packageName}</p>
                        </div>
                    </Col>
                </Row>
                <Row className='flex flex-row items-center justify-center'>
                    <Col xs={6}>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Description</th>
                                <th className="border border-gray-300 px-4 py-2">Amount (Rs.)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Package Price:</td>
                                <td className="border border-gray-300 px-4 py-2">{packData[0]?.packagePrice}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Discount:</td>
                                <td className="border border-gray-300 px-4 py-2 italic">({packData[0]?.discount})</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Net Amount:</td>
                                <td className="border border-gray-300 px-4 py-2">{packData[0]?.totalAmount}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 ">Amount For Extra Sessions In Agreement:</td>
                                <td className="border border-gray-300 px-4 py-2">{packData[0]?.totalAmountForExtraSessions}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 ">Amount For Extra Sessions Not In Agreement:</td>
                                <td className="border border-gray-300 px-4 py-2">{packData[0]?.totalAmountForExtrasNotInAgreement}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 ">Total Amount:</td>
                                <td className="border border-gray-300 px-4 py-2">{packData[0]?.totalAmountToPay}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 ">Payments:</td>
                                <td className="border border-gray-300 px-4 py-2 italic">({(parseFloat(packData[0]?.totalAmountPaid) + parseFloat(amount))})</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 ">Remain:</td>
                                <td className="border border-gray-300 px-4 py-2">{((packData[0]?.totalAmountToPay - packData[0]?.totalAmountPaid - amount) > 0 ? (packData[0]?.totalAmountToPay - packData[0]?.totalAmountPaid - amount) : 0)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col xs={6} className="flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <QRCode value={packageData[0]?.generatedPassword} />
                            <Button variant="primary" className="mt-3" onClick={printInvoice}>Print</Button>
                        </div>
                    </Col>
                </Row>
                </div>:"Payments Not Then can't print invoice"}
        </div>
    );
};

export default Invoice;
