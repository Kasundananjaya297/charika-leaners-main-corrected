import React, {useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {FaCamera, FaCloudUploadAlt} from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import {useFormik} from "formik";
import {Dropdown, Modal} from "react-bootstrap";
import {saveTrainer, uploadFile} from "../../ApiService/api";
import * as Yup from "yup";
import Camera from "../Common/Camera";
import {
    validateEmail,
    validateName,
    validateNIC,
    ValidateNonRequiredName,
    validateTelephone
} from "../../Validation/validation";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function TrainerRegistrationForm(props) {
    //hooks for upload trainer profile picture
    const [uploadState, setUploadState] = useState(true);
    const [fileLocation, setFileLocation] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [submitButton, setSubmitButton] = useState(false);
    const[downloadURL, setDownloadURL] = useState("");
    const [progressBarVisible,setProgressBarVisible] = useState(false);

    //hooks for upload trainer NIC picture
    const [uploadState1, setUploadState1] = useState(true);
    const [fileLocation1, setFileLocation1] = useState("");
    const [uploadProgress1, setUploadProgress1] = useState(0);
    const [submitButton1, setSubmitButton1] = useState(false);
    const[downloadURL1, setDownloadURL1] = useState("");
    const [progressBarVisible1,setProgressBarVisible1] = useState(false);

    //take photo modal hooks
    const [showModalCamera, setShowModalCamera] = useState(false);

    const uploadProfilePicture = async () => {
        try {
            await uploadFile({ Type: "trainer", fileLocation:fileLocation, Id: formik.getFieldProps("registrationNo").value, setUploadProgress:setUploadProgress, setUploadState:setUploadState, setDownloadURL:setDownloadURL,setProgressBarVisible:setProgressBarVisible,category: "profilePhoto"});
            setDownloadURL(downloadURL);
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    }
    const uploadNICPicture = async () => {
        try {
            await uploadFile({ Type: "trainer", fileLocation:fileLocation1, Id: formik.getFieldProps("registrationNo").value, setUploadProgress:setUploadProgress1, setUploadState:setUploadState1, setDownloadURL:setDownloadURL1,setProgressBarVisible:setProgressBarVisible1,category: "nicPhoto"});
            setDownloadURL1(downloadURL1);
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    }

    const nav = useNavigate();

    const back = ()=>{
        nav(-1);
    }

    useEffect(() => {formik.setFieldValue("profilePhotoURL", downloadURL);}, [downloadURL])
    useEffect(() => {formik.setFieldValue("nicURL", downloadURL1);}, [downloadURL1])

    const formik = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            email: "",
            telephone: "",
            addressNo: "",
            adl1: "",
            adl2: "",
            city: "",
            nic: "",
            dateOfBirth: "",
            nicURL: "",
            profilePhotoURL: "",
            licenceNo: "",
            licenceIssuedOn: "",
            bloodType: "",
        },validationSchema: Yup.object({
            fname: validateName("First name"),
            lname: validateName("Last name"),
            email: validateEmail(),
            telephone: validateTelephone(),
            addressNo: Yup.string().notRequired().max(10, "max 10 characters"),
            adl1: validateName("Address line 1"),
            adl2: ValidateNonRequiredName(),
            city: validateName("City"),
            dateOfBirth: Yup.date().required("Date of Birth Required"),
            nic: validateNIC(),
            nicURL: Yup.string().required("NIC URL is required"),
            profilePhotoURL: Yup.string().required("Profile Photo URL is required"),
            licenceNo: Yup.string().required("Licence ID is required").min(7,"Licence ID must be 7 characters").max(7,"Licence ID must be 7 characters"),
            licenceIssuedOn: Yup.date().required("Licence Issued Date is required,License must be older than 5 years").max(new Date(new Date().setFullYear(new Date().getFullYear() - 5)), "License must be older than 5 years"),
            bloodType: Yup.string().required("Blood Type is required"),
        }),
        onSubmit: async (values) => {
            console.log(values);
            try{
                Swal.fire({
                    icon: "warning",
                    title: "Are you sure?",
                    text: "Going to save details",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const response = await saveTrainer(values);
                        if (response.data.code === "00"){
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: "Trainer saved successfully",
                            }).then(() => {
                                //nav(-1);
                            });
                        }else if(response.data.code === "06"){
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Trainer already exists",
                            });
                        }
                    }
                })


            }catch (error) {

            }
        },
    })



    return (
        <div className="flex flex-row justify-center items-center w-screen h-screen">
            <Card style={{ width: "40em" }}>
                <Form onSubmit={formik.handleSubmit}>
                <Card.Body className="overflow-auto h-full">
                    <div className="p-4">
                            <Row>
                                <div className="flex justify-center p-2 bg-neutral-100 rounded-md text-2xl mb-3">
                                    Trainer Details
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md={12}>
                                    <Form.Label>Profile Picture<span className="text-red-500"> *</span></Form.Label>
                                    <div className="flex flex-col">
                                        <div className="flex gap-x-3">
                                            <Form.Control
                                                type="file"
                                                required={true}
                                                onChange={(e) => {
                                                    setFileLocation(e.target.files[0]);
                                                    setUploadState(false);
                                                }}
                                            />
                                            <Button onClick={()=>{setShowModalCamera(true)}}>
                                                <div className=" flex items-center gap-x-2" >
                                                    <FaCamera />
                                                    <div>Take</div>
                                                </div>
                                            </Button>
                                            <Button disabled={uploadState} onClick={()=>{setUploadState(true);setProgressBarVisible(true);uploadProfilePicture()}}>
                                                <div className=" flex items-center gap-x-2" >
                                                    <FaCloudUploadAlt/>
                                                    <div>Upload</div>
                                                </div>
                                            </Button>

                                        </div>
                                        <div className="flex flex-row">
                                            {uploadProgress <= 100 && progressBarVisible && (
                                                <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} className="mt-3  w-full" />
                                            )}
                                        </div>
                                    </div>
                                    <Form.Text className="text-danger">
                                        {formik.touched.profilePhotoURL && formik.errors.profilePhotoURL}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                >
                                    <Form.Label>
                                        First Name<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        {...formik.getFieldProps("fname")}
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.fname && formik.errors.fname}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>
                                        Last Name<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        {...formik.getFieldProps("lname")}
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.lname && formik.errors.lname}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>Email <span className="text-red-500"> *</span></Form.Label>
                                <Form.Control
                                    type="email"
                                        placeholder="Email"
                                        {...formik.getFieldProps("email")}
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.email && formik.errors.email}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>
                                        Telephone<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Telephone"
                                        {...formik.getFieldProps("telephone")}
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.telephone && formik.errors.telephone}
                                    </Form.Text>
                                </Form.Group>
                                </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>
                                        Address No
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Address No"
                                        {...formik.getFieldProps("addressNo")}
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.addressNo && formik.errors.addressNo}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>
                                        Address Line 1<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Address Line 1"
                                        {...formik.getFieldProps("adl1")}
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.adl1 && formik.errors.adl1}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>
                                        Address Line 2
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Address Line 2"
                                        {...formik.getFieldProps("adl2")}
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.adl2 && formik.errors.adl2}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>
                                        City<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="City"
                                        {...formik.getFieldProps("city")}
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.city && formik.errors.city}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>
                                        NIC<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="NIC"
                                        {...formik.getFieldProps("nic")}
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.nic && formik.errors.nic}
                                    </Form.Text>
                                </Form.Group>
                                    <Form.Group as={Col} md={6}>
                                        <Form.Label>NIC Picture<span className="text-red-500"> *</span></Form.Label>
                                        <div className="flex flex-col">
                                            <div className="flex gap-x-3 w-72">
                                                <Form.Control
                                                    type="file"
                                                    required={true}
                                                    onChange={(e) => {
                                                        setFileLocation1(e.target.files[0]);
                                                        setUploadState1(false);
                                                    }}
                                                />
                                                <Button disabled={uploadState1} onClick={()=>{setUploadState1(true);setProgressBarVisible1(true);uploadNICPicture()}}>
                                                    <div className=" flex items-center gap-x-2" >
                                                        <FaCloudUploadAlt/>
                                                        <div>Upload</div>
                                                    </div>
                                                </Button>
                                            </div>
                                            <div className="flex flex-row">
                                                {uploadProgress1 <= 100 && progressBarVisible1 && (
                                                    <ProgressBar now={uploadProgress1} label={`${uploadProgress1}%`} className="mt-3  w-full" />
                                                )}
                                            </div>
                                        </div>
                                        <Form.Text className="text-danger">
                                            {formik.touched.nicURL && formik.errors.nicURL}
                                        </Form.Text>
                                    </Form.Group>
                                </Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>
                                    Date of Birth<span className="text-red-500"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    max = {new Date(new Date().setFullYear(new Date().getFullYear()-23)).toISOString().split("T")[0]}
                                    min = {new Date(new Date().setFullYear(new Date().getFullYear()-55)).toISOString().split("T")[0]}
                                    placeholder="Date of Birth"
                                    {...formik.getFieldProps("dateOfBirth")}
                                    required
                                />
                                <Form.Text className="text-danger">
                                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>
                                    Licence No<span className="text-red-500"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Licence Number"
                                    {...formik.getFieldProps("licenceNo")}
                                    required
                                />
                                <Form.Text className="text-danger">
                                    {formik.touched.licenceNo && formik.errors.licenceNo}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>
                                    Licence Issued On<span className="text-red-500"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    min={new Date(new Date().setFullYear(new Date(formik.getFieldProps("dateOfBirth").value).getFullYear()+22) || new Date()).toISOString().split("T")[0]}
                                    max = {new Date().toISOString().split("T")[0]}
                                    {...formik.getFieldProps("licenceIssuedOn")}
                                    required
                                />
                                <Form.Text className="text-danger">
                                    {formik.touched.licenceIssuedOn && formik.errors.licenceIssuedOn}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} md={6} className="flex items-center gap-x-4 pl-1">
                                <Form.Label>
                                    Blood Type:<span className="text-red-500"> *</span>
                                </Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                                        {(formik.values.bloodType||"Type")}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={()=>{formik.setFieldValue("bloodType","A+")}} >A+</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>{formik.setFieldValue("bloodType","A-")}}>A-</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>{formik.setFieldValue("bloodType","B+")}}>B+</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>{formik.setFieldValue("bloodType","B-")}}>B-</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>{formik.setFieldValue("bloodType","O+")}}>O+</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>{formik.setFieldValue("bloodType","O-")}}>O-</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>{formik.setFieldValue("bloodType","AB+")}}>AB+</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>{formik.setFieldValue("bloodType","AB-")}}>AB-</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Form.Text className="text-danger">
                                    {formik.touched.bloodType && formik.errors.bloodType}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <div className="flex flex-row justify-between items-center bg-neutral-100 p-3 rounded-md">
                            <Button variant="danger" onClick={back}>
                                Back
                            </Button>
                            <Button type="submit" variant="success" disabled={submitButton}>
                                Save
                            </Button>
                        </div>
                    </Row>
                </Card.Footer>
                </Form>
            </Card>
            {/*take photo modal*/}
            <Modal show={showModalCamera} onHide={()=>{setShowModalCamera(false)}}>
                <Modal.Header>
                    <Modal.Title>Take Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Camera />
                </Modal.Body>
            </Modal>
        </div>

    );
}

export default TrainerRegistrationForm;
