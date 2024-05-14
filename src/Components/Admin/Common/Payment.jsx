import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import {Button, Modal} from "react-bootstrap";
import Swal from "sweetalert2";
import {savePayments} from "../../ApiService/api";
import { CiWarning } from "react-icons/ci";
import Invoice from "./Invoice";


export const Payment = ({ data, packageData,setShowModal }) => {
    const [studentData, setStudentData] = useState(data);
    const [packData, setPackData] = useState(packageData);
    const [amount, setPayment] = useState(0);

    //modal to view invoice
    const[showModalViewInvoice, setShowModalViewInvoice] = useState(false);

    console.log(packData[0])

    const savePayment = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to save this payment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const data ={amount, paymentDate: new Date().toISOString().split('T')[0], paymentTime: new Date().toLocaleTimeString([], {hour12: false}), stdID: studentData.stdID, packageID: packData[0].packageID};
                    const response = await savePayments(data);
                    if(response.data.code === "00"){
                        Swal.fire({
                            icon: "success",
                            title: "Payment Saved Successfully"
                        });
                    }else if (response?.data?.code ==="10"){
                        Swal.fire({
                            icon: "error",
                            title: "Payment Save Error",
                            text: response.data.message
                        });
                    }

                }catch (e) {
                    Swal.fire({
                        icon: "error",
                        title: "Payment Save Error",
                        text: e.message
                    })
                }
            }
        });
    }
    useEffect(() => {
        if(packData.length===0){
            Swal.fire({
                icon:"error",
                title:"Error",
                text:"Not Found Package Please Select a Package"
            }).then(()=>{setShowModal(false)})
        }
    }, [packData]);

    return (
        <Card style={{ width: "30rem" }} >
            <div className='bg-gray-50 text-sm flex flex-row w-96 border rounded p-4 gap-y-1 ml-10 mt-3 items-center'>
                <CiWarning size={80}/>
                <span className="text-red-500 text-sm pl-2">
                After the first payment, the package cannot be changed. Please confirm with the student.
            </span>

            </div>
            <div className='bg-gray-50 text-sm flex flex-col w-96 border rounded p-4 gap-y-1 ml-10 mt-3'>
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
                <Row className='text-success font-bold'>
                    <Col xs={4}>Extras:</Col>
                    <Col xs={8}>Rs. {packData[0]?.totalAmountForExtraSessions}</Col>
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
                    <Col xs={8} className='italic'>(Rs. {(parseFloat(packData[0]?.totalAmountPaid)+parseFloat(amount))})</Col>
                </Row>
                <Row className='text-success font-bold mb-2'>
                    <Col xs={4}>Remain:</Col>
                    <Col xs={8} className=''>Rs. {((packData[0]?.totalAmountToPay-packData[0]?.totalAmountPaid-amount)>0?(packData[0]?.totalAmountToPay-packData[0]?.totalAmountPaid-amount):0)}</Col>
                </Row>
                <Button onClick={() => {
                    setShowModalViewInvoice(true)
                }}>View Invoice</Button>
            </div>
            <Row className="mb-4 flex ">
                <div className="items-center mt-3 flex justify-between ml-10">
                    <Form onSubmit={savePayment}>
                        <Form.Group>
                        <Form.Label>
                            Payment<span className="text-red-500"> *</span>
                        </Form.Label>
                        <div className="flex flex-row gap-x-3 w-72">
                            <Form.Control
                                type="number"
                                required
                                min={0}
                                max={(packData[0]?.totalAmountToPay-packData[0]?.totalAmountPaid)}
                                onChange={(e)=>{setPayment(e.target.value===""?0:e.target.value)}}
                            />
                            <div>
                                <Button type="submit">Pay</Button>
                            </div>
                        </div>
                    </Form.Group>
                    </Form>

                </div>
            </Row>
            <Modal show={showModalViewInvoice} onHide={()=>{setShowModalViewInvoice(false)}} fullscreen={true}>
                <Modal.Header closeButton className='flex items-center justify-center flex-row'>
                    <Modal.Title>Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex flex-row items-center justify-center'>
                    <Invoice data={studentData} packageData={packData}/>
                </Modal.Body>
            </Modal>
        </Card>
    );
};

export default Payment;
