import React, {useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {useFormik} from "formik";
import Dropdown from "react-bootstrap/Dropdown";
import {FaCloudUploadAlt, FaUserEdit} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import {getFuelType, getVehicleType, saveFuelType, uploadFile} from "../../ApiService/api";
import * as Yup from "yup";
import {Modal} from "react-bootstrap";
import Swal from "sweetalert2";
import {IoMdAdd} from "react-icons/io";
import AddVehicleType from "./AddVehicleType";

function AddNewVehicle(props) {
    const formik = useFormik({
        initialValues:{
            registrationNo:"",//
            classOfVehicle:"",
            make:"",//
            color:"",//
            passengerCapacity:"",
            fuelType:"",
            cylinderCapacity:"",//
            urlOfBook:"",//
            vehicleTypes:"",
            autoOrManual:"",
        },
        validationSchema:Yup.object({
            registrationNo: Yup.string().required("Required"),
            classOfVehicle: "",
            make: "",
            color: "",
            passengerCapacity: "",
            fuelType: "",
            cylinderCapacity: "",
            urlOfBook: "",
            vehicleTypes: "",
            autoOrManual: "",
        }
        )
    })
    const [uploadState, setUploadState] = useState(true);
    const [fileLocation, setFileLocation] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [submitButton, setSubmitButton] = useState(false);
    const[downloadURL, setDownloadURL] = useState("");
    const [progressBarVisible,setProgressBarVisible] = useState(false);

    const [fuleTypes, setFuelTypes] = useState([]);

    //fetch vehicle Type
    const [vehicleType, setVehicleType] = useState([]);


    //modal for add new fuel type
    const [showModalAddFuel, setShowModalAddFuel] = useState(false);
    const [showModalAddVehicleType, setShowModalAddVehicleType] = useState(false);

    const uploadFileVehicleBook = async () => {
        try {
            await uploadFile({ Type: "Vehicle", fileLocation, Id: formik.getFieldProps("registrationNo").value, setUploadProgress, setUploadState, setDownloadURL,setProgressBarVisible,category: "VehicleBook"});
            //console.log("url.............." + downloadURL);
            setDownloadURL(downloadURL);
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    }
    useEffect(() => {formik.setFieldValue("urlOfBook", downloadURL);}, [downloadURL])
    useEffect(()=>{
        const fetchFuelTypes = async () =>{
            try{
                const response = await getFuelType();
                setFuelTypes(response?.data?.content);
                console.log(response?.data?.content)
            }catch (error){
                console.error("Error in fetchFuelTypes:", error);
            }
        }
        fetchFuelTypes();
    },[showModalAddFuel])

    useEffect(()=>{
        const getVehicleTypes = async () =>{
            try {
                const response = await getVehicleType();
                setVehicleType(response?.data?.content);
                console.log(response?.data);
            }catch (e){
                console.log(e);
            }
        }
        getVehicleTypes();
    },[]);

    const formikFuelType = useFormik({
        initialValues:{
            fuelType:""
        },
        validationSchema:Yup.object({
            fuelType:Yup.string().required("Required").max(20,"Max 20 characters allowed").min(3,"Min 3 characters required").matches(/^[a-zA-Z\s]*$/,"Only alphabets are allowed")
        }),
        onSubmit: async (values,resetForm) => {
            try{
                Swal.fire({
                    icon:"warning",
                    title : "Are you sure",
                    text:"Going to save Fuel"
                }).then(async (result)=>{
                    if(result.isConfirmed){
                        try {
                            const response = await saveFuelType(values);
                            if(response.data.code ==="00"){
                                Swal.fire({
                                    icon: "success",
                                    title: "Saved Successfully",
                                }).then(()=>{setShowModalAddFuel(false)})
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
                resetForm();
            }catch (error){
                formikFuelType.setErrors(error);
            }

        }
    })
    return (
        <div className="flex flex-row justify-center items-center w-screen h-full">
            <Card style={{ width: "40em" }}>
                <Card.Body className="overflow-auto h-full">
                    <div className="p-4">
                        <Form onSubmit={""}>
                            <Row>
                                <div className="flex justify-center p-2 bg-neutral-100 rounded-md text-2xl mb-3">
                                    Vehicle Details
                                </div>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                >
                                    <Form.Label>
                                        Registration No:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="ABC-1234"
                                        {...formik.getFieldProps("registrationNo")}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    className="mb-3">
                                    <Form.Label>
                                        Made By:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Honda ....."
                                        {...formik.getFieldProps("make")}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                >
                                    <Form.Label>
                                        Color:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="color"
                                        {...formik.getFieldProps("color")}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                >
                                    <Form.Label>
                                        Cylinder Capacity:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="100.."
                                        {...formik.getFieldProps("cylinderCapacity")}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group
                                    as={Col}
                                >
                                    <Form.Label>
                                        Passenger Count:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="1.."
                                        {...formik.getFieldProps("passengerCapacity")}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    //className='flex justify-between'
                                >
                                    <Form.Label>
                                        Fuel Type:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-secondary" size="sm" className="h-9 w-full">
                                            {formik.getFieldProps("fuelType").value===""?"Select Fuel Type":formik.getFieldProps("fuelType").value}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {fuleTypes?.map((data,i)=>(
                                                <Dropdown.Item key={i} onClick={() => {
                                                formik.setFieldValue("fuelType", "Petrol")
                                            }}>{data?.fuelType}</Dropdown.Item>))}
                                            <Dropdown.Item className="bg-blue-700 text-white" style={{ backgroundColor: 'gray' }} onClick={()=>{setShowModalAddFuel(true)}}>Add New Fuel Type</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Row>
                            <Modal show={showModalAddFuel} onHide={()=>{setShowModalAddFuel(false)}}>
                                <Form onSubmit={formikFuelType.handleSubmit}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add New Fuel Type</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                        <Form.Group>
                                            <Form.Label>
                                                Fuel Type:<span className="text-red-500"> *</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Fuel Type"
                                                required
                                                {...formikFuelType.getFieldProps("fuelType")}
                                            />
                                        </Form.Group>
                                        <Form.Text className="text-danger">
                                            {formikFuelType.touched.fuelType && formikFuelType.errors.fuelType}
                                        </Form.Text>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={()=>{setShowModalAddFuel(false)}}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                                </Form>
                            </Modal>

                            <Row className='mb-3'>
                                <div className="mb-0 mt-3">
                                    Details Of leaner permit<span className="text-red-500"> *</span>
                                </div>
                                <Row className="mb-3 pl-4 pr-3 items-center mt-2">
                                    <table className="border-1 ml-4">
                                        <tr className="border-1">
                                            <th className="p-2">Vehicle Category</th>
                                            <th>Select</th>
                                            <th></th>
                                        </tr>
                                        {
                                            vehicleType?.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="pl-3">{item?.typeID}-{item?.typeName} {item?.engineCapacity}</td>
                                                    <td className="p-1">
                                                        <Form.Group controlId={`dropdown-${i}`} required>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="outline-secondary" size="sm" className="">
                                                                    {formik.getFieldProps("autoOrManual").value===""?"Select":formik.getFieldProps("autoOrManual").value}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    {(item?.typeAuto)&&<Dropdown.Item onClick={()=>{formik.setFieldValue("autoOrManual","Auto")}}>Auto</Dropdown.Item>}
                                                                    {(item?.typeManual)&&<Dropdown.Item onClick={()=>{formik.setFieldValue("autoOrManual","Manual")}}>Manual</Dropdown.Item>}
                                                                    <Dropdown.Item>--</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Form.Group>
                                                    </td>
                                                    <td className="gap-x-10"><FaUserEdit onClick={() => {
                                                        // edit({
                                                        //     stdId,
                                                        //     typeID: item?.typeID,
                                                        //     typeName: item?.typeName,
                                                        //     engineCapacity: item?.engineCapacity,
                                                        //     typeAuto: item?.typeAuto,
                                                        //     typeManual: item?.typeManual
                                                        // });
                                                        // setDatatoParse();
                                                    }}/></td>
                                                </tr>

                                            ))
                                        }
                                    </table>
                                    <Form.Text className="text-danger">
                                        {formik.touched.expDate && formik.errors.vehicleType}
                                    </Form.Text>
                                </Row>
                                <Row className="pl-4 pr-4">
                                    <Button onClick={()=>{setShowModalAddVehicleType(true)}}>
                                        <div className="flex items-center justify-center gap-x-2">
                                            <IoMdAdd/>
                                            <div>Add Type</div>
                                        </div>
                                    </Button>
                                </Row>
                            </Row>
                            <Modal show={showModalAddVehicleType} onHide={()=>{setShowModalAddVehicleType(false)}}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add New Vehicle type</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddVehicleType />
                                </Modal.Body>
                            </Modal>
                            <Row className='mb-3'>
                                <Form.Group
                                    as={Col}
                                >
                                    <Form.Label>
                                        Upload Book:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <div className='flex gap-x-2 w-96'>
                                        <Form.Control
                                            type="file"
                                            onChange={(e) => {
                                                setFileLocation(e.target.files[0]);
                                                setUploadState(false);
                                            }}
                                            required
                                        />
                                        <Button disabled={uploadState} onClick={() => {
                                            setUploadState(true);
                                            setProgressBarVisible(true);
                                            uploadFileVehicleBook();
                                        }}>
                                            <div className=" flex items-center gap-x-2">
                                                <FaCloudUploadAlt/>
                                                <div>Upload</div>
                                            </div>
                                        </Button>
                                    </div>
                                    <div className="flex flex-row">
                                        {uploadProgress <= 100 && progressBarVisible && (
                                            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`}
                                                         className="mt-3  w-full"/>
                                        )}
                                    </div>
                                </Form.Group>
                            </Row>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}


export default AddNewVehicle;

