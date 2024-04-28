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
import {getFuelType, getVehicleType, saveFuelType, saveNewVehicle, uploadFile} from "../../ApiService/api";
import * as Yup from "yup";
import {Modal} from "react-bootstrap";
import Swal from "sweetalert2";
import {IoMdAdd} from "react-icons/io";
import AddVehicleType from "./AddVehicleType";
import {useNavigate} from "react-router-dom";
import AddVehicleTypeEdit from "./AddVehicleTypeEdit";

function AddNewVehicle(props) {
    //data filtering hook
    const [filterData, setFilterData] = useState([]);

    const formik = useFormik({
        initialValues:{
            registrationNo:"",//
            make:"",//
            color:"",//
            passengerCapacity:"",
            fuelType:"",
            cylinderCapacity:"",//
            urlOfBook:"",//
            typeID:"",
            autoOrManual:"",
            vehiclePhoto:"",
            modal:"",
            dateOfRegistration:""
        },
        validationSchema:Yup.object({
            registrationNo: Yup.string().required("Required").min(5,"Min 5 characters required").max(10,"Max 10 characters allowed").matches(/^[A-Z]{1,5}-\d{4}$/,"Your vehicle number: ABCDE-1234. Five letters, a hyphen, four digits."),
            make: Yup.string().required("Required").max(20,"Max 20 characters allowed").min(3,"Min 3 characters required").matches(/^[a-zA-Z\s]*$/,"Only alphabets are allowed"),
            color: Yup.string().required("Required").max(10,"Max 20 characters allowed").min(2,"Min 3 characters required").matches(/^[a-zA-Z\s]*$/,"Only alphabets are allowed"),
            passengerCapacity: Yup.number().required("Required").min(1,"Min 1 passenger required").max(10,"Max 10 passengers allowed"),
            fuelType: Yup.string().required("Required"),
            cylinderCapacity: Yup.number().required("Required").min(50,"Min 50cc required").max(10000,"Max 1000cc allowed"),
            urlOfBook: Yup.string().required("Required to Upload Image"),
            autoOrManual: Yup.string().required("Required Select One Vehicle Type"),
            vehiclePhoto: Yup.string().required("Required to Upload Image"),
            modal: Yup.string().required("Required").matches(/^[A-Z-\d{4}s]*$/,"Only capital alphabets and hyphen allowed"),
            dateOfRegistration:Yup.date().required("Required")
        }),onSubmit: async (values) => {
            try{
                Swal.fire({
                    icon:"warning",
                    title : "Are you sure",
                    text:"Going to save Vehicle"
                }).then(async (result)=>{
                    if(result.isConfirmed){
                        try {
                            const response = await saveNewVehicle(values);
                            if(response.data.code ==="00"){
                                Swal.fire({
                                    icon: "success",
                                    title: "Saved Successfully",})
                                // }).then(()=>{nav()})
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
                formik.setErrors(error);
            }
        }


    })
    const [uploadState, setUploadState] = useState(true);
    const [fileLocation, setFileLocation] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const[downloadURL, setDownloadURL] = useState("");
    const [progressBarVisible,setProgressBarVisible] = useState(false);

    //upload vehicle photo
    const[downloadURL2, setDownloadURL2] = useState("");
    const [uploadState2, setUploadState2] = useState(true);
    const [fileLocation2, setFileLocation2] = useState("");
    const [uploadProgress2, setUploadProgress2] = useState(0);
    const [progressBarVisible2,setProgressBarVisible2] = useState(false);

    const [fuleTypes, setFuelTypes] = useState([]);

    //fetch vehicle Type
    const [vehicleType, setVehicleType] = useState([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState([]);
    const [ID,setID] = useState("");
    const [autoOrManual, setAutoOrManual] = useState('');
    const [typeID, setTypeID] = useState('');
    const [parseID,setParseID] = useState('');



    //modal for add new fuel type
    const [showModalAddFuel, setShowModalAddFuel] = useState(false);
    const [showModalAddVehicleType, setShowModalAddVehicleType] = useState(false);
    //hook for edit vehicle Modal
    const [showModalEditVehicle, setEditVehicleModal] = useState(false);

    const nav = useNavigate();



    const uploadFileVehicleBook = async () => {
        try {
            await uploadFile({ Type: "Vehicle", fileLocation, Id: formik.getFieldProps("registrationNo").value, setUploadProgress, setUploadState, setDownloadURL,setProgressBarVisible,category: "VehicleBook"});
            //console.log("url.............." + downloadURL);
            setDownloadURL(downloadURL);
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    }

    const uploadVehiclePhoto = async () => {
        try {
            await uploadFile({ Type: "Vehicle", fileLocation:fileLocation2, Id: formik.getFieldProps("registrationNo").value, setUploadProgress:setUploadProgress2, setUploadState:setUploadState2, setDownloadURL:setDownloadURL2,setProgressBarVisible:setProgressBarVisible2,category: "vehiclePhoto"});
            setDownloadURL2(downloadURL2);
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    }
    useEffect(() => {
        formik.setFieldValue("vehiclePhoto", downloadURL2);
    }, [downloadURL2]);
    useEffect(() => {formik.setFieldValue("urlOfBook", downloadURL);}, [downloadURL])
    //hook to set filtered data to formik
    useEffect(()=>{
        formik.setFieldValue("autoOrManual",filterData[0]?.autoOrManual===undefined?"":filterData[0]?.autoOrManual);
        formik.setFieldValue("typeID",filterData[0]?.typeID===undefined?"":filterData[0]?.typeID);
    },[filterData,formik.getFieldProps("autoOrManual").value]);
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
    //fetch vehicle type
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
    },[selectedVehicleType,showModalAddVehicleType]);


    //collect Vehicle Type
    useEffect(() => {
        const newVehicleType =  [...selectedVehicleType];
        newVehicleType[ID] = {autoOrManual,typeID};
        setSelectedVehicleType(newVehicleType);
    }, [autoOrManual,ID]);
    //clear other selected vehicle type
    useEffect(() => {

        for(let i = 0; i<selectedVehicleType.length; i++){
            if(i!==ID){
                selectedVehicleType[i] = {autoOrManual:undefined};
            }
        }

    }, [selectedVehicleType,ID,autoOrManual,vehicleType,typeID]);
   //fuel type selected
   //  useEffect(() => {
   //      console.log(selectedVehicleType);
   //  }, [selectedVehicleType]);
    //filter data to save
    useEffect(() => {
        const filterData = selectedVehicleType.filter((item) => item.autoOrManual !== undefined);
        setFilterData(filterData);
    }, [selectedVehicleType]);

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
    const back = () => {
        nav(-1);
    }
    return (
        <div className="flex flex-row justify-center items-center w-screen h-screen overflow-auto pt-40 mb-4">
            <Form onSubmit={formik.handleSubmit}>
            <Card style={{ width: "40em" }}>
                <Card.Body className="overflow-auto h-full">
                    <div className="p-4">
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
                                    <Form.Text className="text-danger">
                                        {formik.touched.registrationNo && formik.errors.registrationNo}
                                    </Form.Text>
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
                                    <Form.Text className="text-danger">
                                        {formik.touched.make && formik.errors.make}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                >
                                    <Form.Label>
                                        Model:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Model"
                                        {...formik.getFieldProps("modal")}
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.modal && formik.errors.modal}
                                    </Form.Text>
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
                                    <Form.Text className="text-danger">
                                        {formik.touched.cylinderCapacity && formik.errors.cylinderCapacity}
                                    </Form.Text>
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
                                    placeholder="Enter Color"
                                    {...formik.getFieldProps("color")}
                                    required
                                />
                                <Form.Text className="text-danger">
                                    {formik.touched.color && formik.errors.color}
                                </Form.Text>
                            </Form.Group>
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
                                <Form.Text className="text-danger">
                                    {formik.touched.passengerCapacity && formik.errors.passengerCapacity}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                            <Row className='mb-3'>
                                <Form.Group
                                    as={Col}
                                >
                                    <Form.Label>
                                        Manufactured Year:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        min ={new Date("1950-01-01").toISOString().split('T')[0]}
                                        type="date"
                                        {...formik.getFieldProps("dateOfRegistration")}
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.dateOfRegistration && formik.errors.dateOfRegistration}
                                    </Form.Text>
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
                                                formik.setFieldValue("fuelType", data?.fuelType);
                                            }}>{data?.fuelType}</Dropdown.Item>))}
                                            <Dropdown.Item className="bg-blue-700 text-white" style={{ backgroundColor: 'gray' }} onClick={()=>{setShowModalAddFuel(true);}}

                                            >Add New Fuel Type</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Form.Text className="text-danger">
                                        {formik.touched.fuelType && formik.errors.fuelType}
                                    </Form.Text>
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
                                    Select Vehicle Class<span className="text-red-500"> *</span>
                                </div>
                                <Row className="mb-3 pl-4 pr-3 items-center mt-2">
                                    <table className="border-1 ml-4">
                                        <tr className="border-1">
                                            <th className="p-2">Vehicle Class</th>
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
                                                                    {selectedVehicleType[i]?.autoOrManual === undefined ? "Select" : selectedVehicleType[i]?.autoOrManual}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    {(item?.typeAuto)&&<Dropdown.Item onClick={()=>{setID(i);setAutoOrManual("Auto");setTypeID(item?.typeID)}}>Auto</Dropdown.Item>}
                                                                    {(item?.typeManual)&&<Dropdown.Item onClick={()=>{setID(i);setAutoOrManual("Manual");setTypeID(item?.typeID)}}>Manual</Dropdown.Item>}
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Form.Group>
                                                    </td>
                                                    <td className="gap-x-10"><FaUserEdit onClick={() => {
                                                        setParseID(i)
                                                        setEditVehicleModal(true);
                                                    }}/></td>
                                                </tr>

                                            ))
                                        }
                                    </table>
                                    <Form.Text className="text-danger">
                                        {formik.touched.autoOrManual && formik.errors.autoOrManual}
                                    </Form.Text>
                                </Row>
                                <Modal show={showModalEditVehicle} onHide={()=>{setEditVehicleModal(false)}}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Vehicle Type</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <AddVehicleTypeEdit setShowModal={setEditVehicleModal} data={vehicleType[parseID]}/>
                                    </Modal.Body>
                                </Modal>
                                <Row className='items-center justify-center flex'>
                                    <Button onClick={()=>{setShowModalAddVehicleType(true)}} className='ml-6'>
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
                                    <AddVehicleType setShowModal={setShowModalAddVehicleType}/>
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
                                    <Form.Text className="text-danger">
                                        {formik.touched.urlOfBook && formik.errors.urlOfBook}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                        <Row className='mb-3'>
                            <Form.Group
                                as={Col}
                            >
                                <Form.Label>
                                    Upload Vehicle Photo:<span className="text-red-500"> *</span>
                                </Form.Label>
                                <div className='flex gap-x-2 w-96'>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => {
                                            setFileLocation2(e.target.files[0]);
                                            setUploadState2(false);
                                        }}
                                        required
                                    />
                                    <Button disabled={uploadState2} onClick={() => {
                                        setUploadState2(true);
                                        setProgressBarVisible2(true);
                                        uploadVehiclePhoto();
                                    }}>
                                        <div className=" flex items-center gap-x-2">
                                            <FaCloudUploadAlt/>
                                            <div>Upload</div>
                                        </div>
                                    </Button>
                                </div>
                                <div className="flex flex-row">
                                    {uploadProgress2 <= 100 && progressBarVisible2 && (
                                        <ProgressBar now={uploadProgress2} label={`${uploadProgress2}%`}
                                                     className="mt-3  w-full"/>
                                    )}
                                </div>
                                <Form.Text className="text-danger">
                                    {formik.touched.vehiclePhoto && formik.errors.vehiclePhoto}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Form.Group>
                        <Row>
                            <div
                                className="flex flex-row justify-between items-center bg-neutral-100 p-2 rounded-md">
                                <Button variant="danger" onClick={back}>
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="success"
                                >
                                    Save
                                </Button>
                            </div>
                        </Row>
                    </Form.Group>
                </Card.Footer>
            </Card>
            </Form>
        </div>
    );
}


export default AddNewVehicle;

