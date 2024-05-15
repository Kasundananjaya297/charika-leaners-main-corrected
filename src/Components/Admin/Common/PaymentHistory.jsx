import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {Button, Table} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { MdEdit } from "react-icons/md";
import {getPaymentDetails} from "../../ApiService/api";
import Swal from "sweetalert2";

const PaymentHistory = ({ data, packageData,setShowModal }) => {
    const [studentData, setStudentData] = useState(data);
    const [packData, setPackData] = useState(packageData);
    const [amount, setPayment] = useState(0);
    const [payments,setPayments] = useState([]);
    const [showModalPayemntRecipt, setShowModalPayemntRecipt] = useState(false);

    useEffect(() => {
        if(packData.length===0){
            Swal.fire({
                icon:"error",
                title:"Error",
                text:"Not Found Package Please Select a Package"
            }).then(()=>{setShowModal(false)})
        }
    }, [packData]);

    useEffect(() => {
        console.log(studentData?.stdID,packData[0]?.packageID)
        const fetchData = async ()=>{
            try {
                const response = await getPaymentDetails(studentData?.stdID,packData[0]?.packageID);
                setPayments(response?.data?.content)
            }catch (error){
                console.log(error)
            }
        }
        fetchData();
    },[studentData]);

    return (
        <Card>
            <div className='flex flex-col'>
                <div className='items-center justify-center flex'>
                    <div className='bg-gray-50 text-sm flex flex-col w-96 border rounded p-4 gap-y-1 mt-3'>
                        <Row>
                            <Col xs={4}>Contract No:</Col>
                            <Col xs={8}>{studentData?.stdID}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>Name:</Col>
                            <Col xs={8}>{studentData?.fname} {studentData?.lname}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>NIC:</Col>
                            <Col xs={8}>{studentData?.nic}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>Package ID:</Col>
                            <Col xs={8}>{packData[0]?.packageID}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>Pack Name:</Col>
                            <Col xs={8}>{packData[0]?.packageName}</Col>
                        </Row>
                        <Row className='font-bold'>
                            <Col xs={4}>Pack Price:</Col>
                            <Col xs={8}>Rs. {packData[0]?.packagePrice}</Col>
                        </Row>
                        <Row className='text-danger font-bold'>
                            <Col xs={4}>Discount:</Col>
                            <Col xs={8} className='italic'>(Rs. {packData[0]?.discount})</Col>
                        </Row>
                        <Row className='text-success font-bold'>
                            <Col xs={4}>Net:</Col>
                            <Col xs={8}>Rs. {packData[0]?.totalAmount}</Col>
                        </Row>
                        <Row className='text-success font-bold items-center flex justify-center'>
                            <Col xs={4}>Extras Not In Agreement:</Col>
                            <Col xs={8}>Rs. {packData[0]?.totalAmountForExtrasNotInAgreement}</Col>
                        </Row>
                        <Row className='text-success font-bold items-center '>
                            <Col xs={4}>Total Amount:</Col>
                            <Col xs={5} className='border-black border-b-4 border-t-2'>Rs. {packData[0]?.totalAmountToPay}</Col>
                        </Row>
                        <Row className='text-danger font-bold'>
                            <Col xs={4}>Payments:</Col>
                            <Col xs={8}
                                 className='italic'>(Rs. {(parseFloat(packData[0]?.totalAmountPaid) + parseFloat(amount))})</Col>
                        </Row>
                        <Row className='text-success font-bold'>
                            <Col xs={4}>Remain:</Col>
                            <Col xs={8}
                                 className=''>Rs. {((packData[0]?.totalAmountToPay - packData[0]?.totalAmountPaid - amount) > 0 ? (packData[0]?.totalAmountToPay - packData[0]?.totalAmountPaid - amount) : 0)}</Col>
                        </Row>
                    </div>
                </div>
                <div className='w-full pl-8 pr-12 overflow-y-scroll h-40 mt-4'>
                    <Row className='mt-3 flex-row items-start justify-start p-2 '>
                        <Table responsive bordered hover className="table-striped table-bordered table-hover">
                            <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Time</th>
                                <th className='px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                            </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200 text-sm'>
                            {payments.map((payment, i) => (
                                <tr key={i}>
                                    <td className='p-2'>{payment?.paymentDate}</td>
                                    <td>{payment?.paymentTime}</td>
                                    <td>Rs. {payment?.amount}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Row>
                </div>
            </div>
        </Card>
    );
};

export default PaymentHistory;