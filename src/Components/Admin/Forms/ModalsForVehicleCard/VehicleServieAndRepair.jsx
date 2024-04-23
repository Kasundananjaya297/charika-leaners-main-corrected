import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Swal from "sweetalert2";
import {saveNewVehicle, saveVehicleServiceOrRepair} from "../../../ApiService/api";

function VehicleServieAndRepair({vehicleData,show, onHide,setInterrupt,interrupt}) {
    //formik to validate the form and save
    const saveVehicleServiceDataFormik = useFormik({
        initialValues:{
            invoiceNo:"",//
            milage:"",//
            contactNumber:"",//
            repairCenter:"",//
            servicedDate:"",//
           servicedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            returnDate:"",//
            registrationNo:vehicleData.registrationNo,
        },validationSchema: Yup.object({
            invoiceNo: Yup.string(),
            milage: Yup.number().required("Milage is required"),
            contactNumber: Yup.string().required("Contact Number is required"),
            repairCenter: Yup.string().required("Repair Center is required"),
            servicedDate: Yup.date().required("Serviced Date is required"),
            returnDate: Yup.date(),
            returnTime: Yup.date(),
        }),onSubmit: async (values) =>{
            try{
                Swal.fire({
                    icon:"warning",
                    title : "Are you sure",
                    text:"Going to save Vehicle"
                }).then(async (result)=>{
                    if(result.isConfirmed){
                        try {
                            const response = await saveVehicleServiceOrRepair(values);
                            if(response.data.code ==="00"){
                                Swal.fire({
                                    icon: "success",
                                    title: "Saved Successfully",})
                                setInterrupt(!interrupt);
                            }else if(response.data.code ==="06"){
                                Swal.fire({
                                    icon: "error",
                                    title: "Failed to save",
                                    text: response.data.message
                                })
                            }else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Failed to save",
                                    text: "Something went wrong"
                                })
                            }
                        }catch(error){
                            Swal.fire({
                                icon: "error",
                                title: "Failed to save",
                                text: error.message
                            })
                        }
                    }
                })
            }catch (error){
                Swal.fire({
                    icon: "error",
                    title: "Failed to save",
                    text: error.message
                })
            }

        }
    })
    return (
        <Modal show={show} onHide={()=>{onHide(false);setInterrupt(!interrupt)}} size={'lg'}>
            <Modal.Header closeButton>
                <Modal.Title>Vehicle Service and Repair</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {vehicleData?.vehicleServiceORRepairs[0]?.itemsORDones?.length !==0 ?
                    (
                   <Form onSubmit={saveVehicleServiceDataFormik.handleSubmit}>
                    <Row>
                        <Form.Group
                            as={Col}
                        >
                            <Form.Label>
                                Invoice No:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Invoice number"
                                {...saveVehicleServiceDataFormik.getFieldProps("invoiceNo")}
                            />
                            <Form.Text className="text-danger">
                                {saveVehicleServiceDataFormik.touched.invoiceNo && saveVehicleServiceDataFormik.errors.invoiceNo}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            className="mb-3">
                            <Form.Label>
                                Service/Repair Center:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter repair Center"
                                {...saveVehicleServiceDataFormik.getFieldProps("repairCenter")}
                                required
                            />
                            <Form.Text className="text-danger">
                                {saveVehicleServiceDataFormik.touched.repairCenter && saveVehicleServiceDataFormik.errors.repairCenter}
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group
                            as={Col}
                        >
                            <Form.Label>
                                Service/Repair Contact: <span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Contact number"
                                {...saveVehicleServiceDataFormik.getFieldProps("contactNumber")}
                                required
                            />
                            <Form.Text className="text-danger">
                                {saveVehicleServiceDataFormik.touched.contactNumber && saveVehicleServiceDataFormik.errors.contactNumber}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            className="mb-3">
                            <Form.Label>
                                Milage Vehicle Driven:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                min={vehicleData?.vehicleServiceORRepairs[0]?.milage || 0}
                                placeholder="Enter Milage in Km"
                                {...saveVehicleServiceDataFormik.getFieldProps("milage")}
                                required
                            />
                            <Form.Text className="text-danger">
                                {saveVehicleServiceDataFormik.touched.milage && saveVehicleServiceDataFormik.errors.milage}
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group
                            as={Col}
                        >
                            <Form.Label>
                                Service/Repair Starts on: <span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="Date"
                                {...saveVehicleServiceDataFormik.getFieldProps("servicedDate")}
                                required
                            />
                            <Form.Text className="text-danger">
                                {saveVehicleServiceDataFormik.touched.servicedDate && saveVehicleServiceDataFormik.errors.servicedDate}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            className="mb-3">
                            <Form.Label>
                                Service/Repair End on:
                            </Form.Label>
                            <Form.Control
                                type="date"
                                {...saveVehicleServiceDataFormik.getFieldProps("returnDate")}
                                required
                            />
                            <Form.Text className="text-danger">
                                {saveVehicleServiceDataFormik.touched.returnDate && saveVehicleServiceDataFormik.errors.returnDate}
                            </Form.Text>
                        </Form.Group>
                    </Row>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            onHide(false)
                        }}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
                ):("Current Service or repair is not finished yet. Please finish the current service or repair first.")}

            </Modal.Body>
        </Modal>
    );
}
export default VehicleServieAndRepair;