import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {FaCloudUploadAlt, FaUserEdit} from "react-icons/fa";
import Image from "react-bootstrap/Image";
import {Button, InputGroup, Modal} from "react-bootstrap";
import { Document, Page ,pdfjs} from 'react-pdf';
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
    getVehicleInsuranceTypes, saveInsurance,
    saveNewVehicleInsuranceType,
    saveVehicleLicense,
    updateUrlBook,
    uploadFile
} from "../../ApiService/api";
import {useFormik} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {AiFillWarning} from "react-icons/ai";
import Dropdown from "react-bootstrap/Dropdown";
import addVehicleTypeEdit from "../Forms/AddVehicleTypeEdit";


function VehicleCard({vehicleData,interrupt,setInterrupt}) {
    console.log(vehicleData);
    //modal for view vehicle image
    const [showVehileImageModal, setShowVehicleModle] = useState(false);
    //modal for vehicle book update
    const [showVehicleBookUpdateModal, setShowVehicleBookUpdateModal] = useState(false);
    //modal for add Licence
    const [showAddLicenceModal, setShowaddLicenceModal] = useState(false);
    //modal for view vehicle Licence
    const [showViewLicenceModal, setShowViewLicenceModal] = useState(false);
    //modal for add insurance
    const [showAddInsuranceModal, setShowAddInsuranceModal] = useState(false);
    //hook to store insurance Type
    const [insuranceType, setInsuranceType] = useState([]);
    //hook for modal to add insurance type
    const [showModalAddInsuranceType, setShowModalAddInsuranceType] = useState(false);
    //hook for show InsuranceModal
    const [showInsuranceModal, setShowInsuranceModal] = useState(false);

    //upload book
    const [uploadState, setUploadState] = useState(true);
    const [fileLocation, setFileLocation] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const[downloadURL, setDownloadURL] = useState("");
    const [progressBarVisible,setProgressBarVisible] = useState(false);








    const uploadFileVehicleBook = async () => {
        try {
            await uploadFile({ Type: "Vehicle", fileLocation, Id: formik.getFieldProps("registrationNo").value, setUploadProgress, setUploadState, setDownloadURL,setProgressBarVisible,category: "VehicleBook"});
            //console.log("url.............." + downloadURL);
            setDownloadURL(downloadURL);
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    };

    // upload permit hooks
    const [uploadState2, setUploadState2] = useState(true);
    const [fileLocation2, setFileLocation2] = useState("");
    const [uploadProgress2, setUploadProgress2] = useState(0);
    const[downloadURL2, setDownloadURL2] = useState("");
    const [progressBarVisible2,setProgressBarVisible2] = useState(false);

    //function to upload permit
    const uploadPermit = async () => {
        try {
            await uploadFile({ Type: "Vehicle", fileLocation:fileLocation2, Id: formik.getFieldProps("registrationNo").value, setUploadProgress:setUploadProgress2, setUploadState:setUploadState2, setDownloadURL:setDownloadURL2,setProgressBarVisible:setProgressBarVisible2,category: "Permit"});
            //console.log("url..............2222" , downloadURL2);
            setDownloadURL2(downloadURL2);
            // console.log(uploadProgress2)
            // console.log(fileLocation2)
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    }
    // upload insurance hooks
    const [uploadState3, setUploadState3] = useState(true);
    const [fileLocation3, setFileLocation3] = useState("");
    const [uploadProgress3, setUploadProgress3] = useState(0);
    const[downloadURL3, setDownloadURL3] = useState("");
    const [progressBarVisible3,setProgressBarVisible3] = useState(false);



    const uploadInsurance = async () => {
        try {
            await uploadFile({ Type: "Vehicle", fileLocation:fileLocation3, Id: formik.getFieldProps("registrationNo").value, setUploadProgress:setUploadProgress3, setUploadState:setUploadState3, setDownloadURL:setDownloadURL3,setProgressBarVisible:setProgressBarVisible3,category: "Insurance"});
            //console.log("url..............2222" , downloadURL2);
            setDownloadURL3(downloadURL3);
            // console.log(uploadProgress2)
            // console.log(fileLocation2)
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    }


    const formik = useFormik({
        initialValues:{
            urlOfBook: "",
        },validationSchema: Yup.object({
            urlOfBook: Yup.string().required("Please upload a file"),
        }),onSubmit: () =>{
            Swal.fire({
                icon:"warning",
                title : "Are you sure",
                text:"Going to Change Vehicle Book",
            }).then(async (result)=>{
                if(result.isConfirmed){
                    try {
                        const response = await updateUrlBook({urlOfBook:downloadURL,registrationNo:vehicleData?.registrationNo});
                        if(response?.data.code ==="00"){
                            Swal.fire({
                                icon:"success",
                                title:"Book Updated Successfully",
                            }).then(()=>setInterrupt(!interrupt));
                            setShowVehicleBookUpdateModal(false);
                        }else if(response?.data.code ==="10"){
                            Swal.fire({
                                icon:"error",
                                title:"Book Update Failed",
                            });
                        }
                    }catch (error) {
                        Swal.fire({
                            icon:"error",
                            title:"Book Update Failed",
                        })
                    }

                }
            })

        }
    })
    const saveLicenceFormik = useFormik({
        initialValues:{
            registrationNo: vehicleData?.registrationNo,
            licenseNo:"",
            annualFee: "",
            arrearsFee: "",
            finesPaid: "",
            issuedDate: "",
            startDate:"",
            expiryDate: "",
            licenseLink: "",
        },
        validationSchema: Yup.object({
            licenseNo:Yup.string().required("Please enter License Number").max(8,"maximum characters is 8").min(8,"minimum characters is 8"),
            annualFee:Yup.number().required("Please enter Annual Fee"),
            arrearsFee:Yup.number().required("Please enter Arrears Fee"),
            finesPaid:Yup.number().required("Please enter Fines Paid"),
            issuedDate:Yup.date().required("Please enter Issued Date"),
            startDate:Yup.date().required("Please enter Start Date"),
            expiryDate:Yup.date().required("Please enter Expiry Date"),
            licenseLink:Yup.string().required("upload license file"),
        }),onSubmit:(values)=>{
            console.log("Licence+++++++++++++++++++++++++",values);
            Swal.fire({
                icon:"warning",
                title : "Are you sure",
                text:"Going to Add Licence",
            }).then(async (result)=>{
                if(result.isConfirmed){
                    try {
                        const response = await saveVehicleLicense(values);
                        if(response?.data.code ==="00"){
                            Swal.fire({
                                icon:"success",
                                title:"Licence Added Successfully",
                            }).then(()=>setInterrupt(!interrupt));
                            setShowaddLicenceModal(false);
                        }else if(response?.data.code ==="06"){
                            Swal.fire({
                                icon:"error",
                                title:"Already exist",
                            });
                        }
                    }catch (error) {
                        Swal.fire({
                            icon:"error",
                            title:"Licence Add Failed",
                        })
                    }

                }
            })
        }


    })
    const saveInsuranceFormik = useFormik({
        initialValues:{
            registrationNo: vehicleData?.registrationNo,
            certificateNo: "",
            startDate: "",
            endDate: "",
            issuedDate: "",
            insuranceLink: "",
            insuranceCompany: "",
            annualFee: "",
            insuranceType:"",
        },validationSchema: Yup.object({
        certificateNo:Yup.string().required("Please enter Certificate Number").max(8,"maximum characters is 8").min(8,"minimum characters is 8").matches(/^[A-Z0-9]+$/,"Invalid Certificate Number Capital Letters and Numbers only"),
        startDate:Yup.date().required("Please enter Start Date"),
        endDate:Yup.date().required("Please enter End Date"),
        issuedDate:Yup.date().required("Please enter Issued Date"),
        insuranceLink:Yup.string().required("upload insurance file"),
        insuranceCompany:Yup.string().required("Please enter Insurance Company"),
        annualFee:Yup.number().required("Please enter Annual Fee"),
        insuranceType:Yup.string().required("Please Select Insurance Type"),
        }),onSubmit:(values)=>{
            Swal.fire({
                icon:"warning",
                title : "Are you sure",
                text:"Going to Add Insurance",
            }).then(async (result)=>{
                if(result.isConfirmed){
                    try {
                        const response = await saveInsurance(values);
                        if(response?.data.code ==="00"){
                            Swal.fire({
                                icon:"success",
                                title:"Insurance Added Successfully",
                            }).then(()=>setInterrupt(!interrupt));
                            setShowAddInsuranceModal(false);
                        }else if(response?.data.code ==="06"){
                            Swal.fire({
                                icon:"error",
                                title:"Already exist",
                            });
                        }
                    }catch (error) {
                        Swal.fire({
                            icon:"error",
                            title:"Insurance Add Failed",
                        })
                    }

                }
            })
        }
    })

    const formikAddNewInsuranceType = useFormik({
        initialValues:{
            type: "",
        },validationSchema: Yup.object({
            type:Yup.string().required("please Enter insurance Type").max(20,"maximum characters is 20").min(3,"minimum characters is 3").matches(/^[A-Za-z_]+$/,"Invalid Insurance Type No Spaces and Numbers"),
        }),onSubmit:(values)=>{
            Swal.fire({
                icon:"warning",
                title : "Are you sure",
                text:"Going to Add Insurance Type",
            }).then(async (result)=>{
                if(result.isConfirmed){
                    try {
                        const response = await saveNewVehicleInsuranceType(values);
                        if(response?.data.code ==="00"){
                            Swal.fire({
                                icon:"success",
                                title:"Insurance Type Added Successfully",
                            }).then(()=>setInterrupt(!interrupt));
                            setShowModalAddInsuranceType(false);
                        }else if(response?.data.code ==="06"){
                            Swal.fire({
                                icon:"error",
                                title:"Already exist",
                            });
                        }
                    }catch (error) {
                        Swal.fire({
                            icon:"error",
                            title:"Insurance Type Add Failed",
                        })
                    }

                }
            })
        }
    })

    //set min date for expiry date
    //validate Licence issued Date
    let vehicleIssuedDataPrevious;
    if (vehicleData?.licenses[0]?.issuedDate === undefined || vehicleData?.licenses[0]?.issuedDate === null) {
        vehicleIssuedDataPrevious = new Date();
        vehicleIssuedDataPrevious.setFullYear(vehicleIssuedDataPrevious.getFullYear() - 1);
    } else {
        const issuedDate = new Date(vehicleData?.licenses[0]?.issuedDate);
        issuedDate.setFullYear(issuedDate.getFullYear() + 1);
        issuedDate.setMonth(issuedDate.getMonth() - 1);
        vehicleIssuedDataPrevious = issuedDate;
    }
// Extract the minimum date for Licence issued date
    const mindateForLicenceIssuedDate = vehicleIssuedDataPrevious.toISOString().split('T')[0];

    //validate Licence Start Date
    const issuedDate = saveLicenceFormik.getFieldProps("issuedDate").value||mindateForLicenceIssuedDate||vehicleData.licenses[0]?.startDate;
    const currentDate = issuedDate === undefined ? new Date() : new Date(issuedDate);
    //currentDate.setFullYear(currentDate.getFullYear() + 1);
    currentDate.setDate(currentDate.getDate() - 1);
    const minDateForStartDate = currentDate.toISOString().split('T')[0];

    //validate Insurance Date
    let vehicleIssuedDataPreviousInsurance;
    if (vehicleData?.insurances[0]?.issuedDate === undefined || vehicleData?.insurances[0]?.issuedDate === null) {
        vehicleIssuedDataPreviousInsurance = new Date();
        vehicleIssuedDataPreviousInsurance.setFullYear(vehicleIssuedDataPreviousInsurance.getFullYear() - 1);
    }else{
        const issuedDate = new Date(vehicleData?.insurances[0]?.issuedDate);
        issuedDate.setFullYear(issuedDate.getFullYear() + 1);
        issuedDate.setMonth(issuedDate.getMonth() - 1);
        vehicleIssuedDataPreviousInsurance = issuedDate;
    }
    const mindateForInsuranceIssuedDate = vehicleIssuedDataPreviousInsurance.toISOString().split('T')[0];

    const issuedDateInsurance = saveInsuranceFormik.getFieldProps("issuedDate").value||mindateForInsuranceIssuedDate||vehicleData.insurances[0]?.startDate||new Date();
    const currentDateInsurance = issuedDateInsurance === undefined ? new Date() : new Date(issuedDateInsurance);
    //currentDateInsurance.setFullYear(currentDateInsurance.getFullYear() + 1);
    currentDateInsurance.setDate(currentDateInsurance.getDate() - 1);
    const minDateForStartDateInsurance = currentDateInsurance.toISOString().split('T')[0];


    useEffect(() => {formik.setFieldValue("urlOfBook", downloadURL);}, [downloadURL])
    useEffect(() => {saveLicenceFormik.setFieldValue("licenseLink", downloadURL2);}, [downloadURL2])
    useEffect(() => {saveInsuranceFormik.setFieldValue("insuranceLink", downloadURL3)}, [downloadURL3]);
    useEffect(() => {
        const getInsuranceType = async () => {
            try {
                const response = await getVehicleInsuranceTypes();
                if (response?.data.code === "00") {
                    setInsuranceType(response?.data?.content);
                    console.log(response?.data?.content);
                }
            } catch (error) {
                console.error("Error in getInsuranceType:", error);}
        }
        getInsuranceType();
    }, [showModalAddInsuranceType]);

    return (
        <div>
            <Row className="flex overflow-hidden text-sm item-center">
                <Col sm={12} md={6} lg={4}>
                    <Card style={{ width: "25rem"}}>
                        <div className="flex  justify-between pr-1 pl-5 pt-3 w-wrap h-wrap mb-2 " >
                            <FaUserEdit size={24} onClick={""}/>
                            <Col xs={1} sm={3}>
                                <div className="flex justify-center rounded-full items-center  w-fit h-fit bg-gray-200">
                                    <div className=" w-16 h-16 p-2 rounded-full">
                                        <Image src={`${vehicleData?.vehiclePhoto}`} style={{ width: '100%', height: '100%' }} roundedCircle onClick={()=>setShowVehicleModle(true)}/>
                                    </div>
                                </div>
                            </Col>
                        </div>
                        <Modal show={showVehileImageModal} onHide={() => setShowVehicleModle(false)} centered>
                            <Modal.Body className="text-center">
                                <Image src={`${vehicleData?.vehiclePhoto}`} rounded />
                            </Modal.Body>
                        </Modal>
                        <Card.Body className="p-4">
                            <Row className="mb-2">
                                <Col xs={4}>Reg No:</Col>
                                <Col xs={8} className="pl-4">
                                    {vehicleData?.registrationNo}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Made By:</Col>
                                <Col xs={8} className="pl-4">
                                    {vehicleData?.make}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Body Color:</Col>
                                <Col xs={8} className="pl-4">
                                    {vehicleData?.color}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Passengers:</Col>
                                <Col xs={8} className="pl-4">
                                    {vehicleData?.passengerCapacity}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Fuel Type:</Col>
                                <Col xs={8} className="pl-4">
                                    {vehicleData?.fuelType}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Engine:</Col>
                                <Col xs={8} className="pl-4">
                                    {vehicleData?.cylinderCapacity} cc
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Transmission:</Col>
                                <Col xs={8} className="pl-4">
                                    {vehicleData?.autoOrManual}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4}>Class:</Col>
                                <Col xs={8} className="pl-4">
                                    {vehicleData?.typeID} - {vehicleData?.vehicleClass}
                                </Col>
                            </Row>
                            <Row className="mb-2 flex items-center">
                                <Col xs={4}>Book:</Col>
                                <Col xs={8} className="pl-4">
                                    <Button
                                        className="flex w-18 h-8 justify-center items-center"
                                        variant="outline-success"
                                        style={{ fontSize: "small" }}
                                        onClick={()=>{setShowVehicleBookUpdateModal(true)}}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        className="flex w-18 h-8 justify-center items-center ml-4"
                                        variant="link"
                                        style={{ fontSize: "small" }}
                                        onClick={() => {
                                            window.open(vehicleData?.urlOfBook, '_blank');
                                        }}
                                    >
                                        View
                                    </Button>
                                </Col>
                            </Row>
                            <Modal show={showVehicleBookUpdateModal} onHide={()=>{setShowVehicleBookUpdateModal(false)}}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update Book</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Row className='mb-3'>
                                            <Form.Group
                                                as={Col}
                                            >
                                                <Form.Label>
                                                    Book:<span className="text-red-500"> *</span>
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
                                                    <Button disabled={uploadState} onClick={()=>{
                                                        setUploadState(true);
                                                        setProgressBarVisible(true);
                                                        uploadFileVehicleBook();}}>
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
                                        <Row className='mb-3 flex flex-row items-end justify-end'>
                                            <div className="w-full justify-end items-end flex">
                                                <Button type="submit">Save</Button>
                                            </div>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                            <Row className="mb-2">
                                <Col xs={4}>Licence:</Col>
                                <Col xs={8} className="pl-4">
                                    <Button
                                        className="flex w-18 h-8 justify-center items-center"
                                        variant="outline-success"
                                        style={{ fontSize: "small" }}
                                        onClick={()=>{setShowaddLicenceModal(true)}}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        className="flex w-18 h-8 justify-center items-center ml-4"
                                        variant="link"
                                        style={{ fontSize: "small" }}
                                        onClick={() => {
                                            setShowViewLicenceModal(true);
                                        }}
                                    >
                                        View
                                    </Button>
                                </Col>
                            </Row>
                            <Modal show={showAddLicenceModal} onHide={()=>{setShowaddLicenceModal(false)}} size={'lg'}>
                                <Form onSubmit={saveLicenceFormik.handleSubmit}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Licence</Modal.Title>
                                    </Modal.Header>
                                    {vehicleData?.licenses[0]?.validMonths !==0?(
                                    <Modal.Body>
                                        <div>Not Expired Current Licence</div>
                                        <div>There is {vehicleData?.licenses[0]?.validMonths} months have to expire current licence</div>
                                    </Modal.Body>
                                    ):(
                                        <Modal.Body>
                                        <Card.Body className="overflow-auto h-full">
                                            <div className="p-4">
                                                <Row>
                                                    <Form.Group
                                                        as={Col}
                                                    >
                                                        <Form.Label>
                                                            Licence No:<span className="text-red-500"> *</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Enter Licence number"
                                                            {...saveLicenceFormik.getFieldProps("licenseNo")}
                                                            required
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {saveLicenceFormik.touched.licenseNo && saveLicenceFormik.errors.licenseNo}
                                                        </Form.Text>
                                                    </Form.Group>
                                                    <Form.Group
                                                        as={Col}
                                                        className="mb-3">
                                                        <Form.Label>
                                                            Annual Fee:<span className="text-red-500"> *</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            min={0}
                                                            type="text"
                                                            placeholder="Enter Fee"
                                                            {...saveLicenceFormik.getFieldProps("annualFee")}
                                                            required
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {saveLicenceFormik.touched.annualFee && saveLicenceFormik.errors.annualFee}
                                                        </Form.Text>
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group
                                                        as={Col}
                                                    >
                                                        <Form.Label>
                                                            Areas Fee:<span className="text-red-500"> *</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Enter areas fee"
                                                            {...saveLicenceFormik.getFieldProps("arrearsFee")}
                                                            required
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {saveLicenceFormik.touched.arrearsFee && saveLicenceFormik.errors.arrearsFee}
                                                        </Form.Text>
                                                    </Form.Group>
                                                    <Form.Group
                                                        as={Col}
                                                        className="mb-3">
                                                        <Form.Label>
                                                            Fines Paid:<span className="text-red-500"> *</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            min={0}
                                                            type="text"
                                                            placeholder="Enter Fines Paid"
                                                            {...saveLicenceFormik.getFieldProps("finesPaid")}
                                                            required
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {saveLicenceFormik.touched.finesPaid && saveLicenceFormik.errors.finesPaid}
                                                        </Form.Text>
                                                    </Form.Group>
                                                </Row>

                                                <Row>
                                                    <Form.Group
                                                        as={Col}
                                                    >
                                                        <Form.Label>
                                                            Issued Date:<span className="text-red-500"> *</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            min={mindateForLicenceIssuedDate}
                                                            max={new Date(new Date(mindateForLicenceIssuedDate).setFullYear(new Date(mindateForLicenceIssuedDate).getFullYear() + 1)).toISOString().split('T')[0]}
                                                            {...saveLicenceFormik.getFieldProps("issuedDate")}
                                                            required
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {saveLicenceFormik.touched.issuedDate && saveLicenceFormik.errors.issuedDate}
                                                        </Form.Text>
                                                    </Form.Group>
                                                    <Form.Group
                                                        as={Col}
                                                        className="mb-3">
                                                        <Form.Label>
                                                            Start Date:<span className="text-red-500"> *</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            min={new Date(new Date(minDateForStartDate).setDate(new Date(minDateForStartDate).getDate() - 15)).toISOString().split('T')[0]}
                                                            max={new Date(new Date(minDateForStartDate).setDate(new Date(minDateForStartDate).getDate() + 5)).toISOString().split('T')[0]}
                                                            type="date"
                                                            {...saveLicenceFormik.getFieldProps("startDate")}
                                                            required
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {saveLicenceFormik.touched.startDate && saveLicenceFormik.errors.startDate}
                                                        </Form.Text>
                                                    </Form.Group>
                                                </Row>
                                                <Row className="w-full">
                                                    <Form.Group
                                                        as={Col}
                                                        className="mb-3">
                                                        <Form.Label>
                                                            Expire Date:<span className="text-red-500"> *</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            max={new Date(new Date(new Date(minDateForStartDate).setFullYear(new Date(minDateForStartDate).getFullYear() + 1)).setDate(new Date(minDateForStartDate).getDate() + 15)).toISOString().split('T')[0]}
                                                            min={new Date(new Date(new Date(minDateForStartDate).setFullYear(new Date(minDateForStartDate).getFullYear() + 1)).setDate(new Date(minDateForStartDate).getDate() - 15)).toISOString().split('T')[0]}
                                                            type="date"
                                                            {...saveLicenceFormik.getFieldProps("expiryDate")}
                                                            required
                                                        />
                                                        <Form.Text className="text-danger">
                                                            {saveLicenceFormik.touched.expiryDate && saveLicenceFormik.errors.expiryDate}
                                                        </Form.Text>
                                                    </Form.Group>
                                                    <Form.Group
                                                        as={Col}
                                                        className="-mr-8"
                                                    >
                                                        <Form.Label>
                                                            Upload Permit:<span className="text-red-500"> *</span>
                                                        </Form.Label>
                                                        <div className='flex gap-x-2 w-full'>
                                                            <Form.Control
                                                                type="file"
                                                                onChange={(e) => {
                                                                    setFileLocation2(e.target.files[0]);
                                                                    setUploadState2(false);
                                                                }}
                                                            />
                                                            <Button disabled={uploadState2} onClick={() => {
                                                                setUploadState2(true);
                                                                setProgressBarVisible2(true);
                                                                uploadPermit();
                                                            }}>
                                                                <div className=" flex items-center gap-x-2">
                                                                    <FaCloudUploadAlt/>
                                                                    <div>Upload</div>
                                                                </div>
                                                            </Button>
                                                        </div>
                                                        <div className="flex flex-row">
                                                            {uploadProgress2 <= 100 && progressBarVisible2 && (
                                                                <ProgressBar now={uploadProgress2}
                                                                             label={`${uploadProgress2}%`}
                                                                             className="mt-3  w-full"/>
                                                            )}
                                                        </div>
                                                        <Form.Text className="text-danger">
                                                            {saveLicenceFormik.touched.licenseLink && saveLicenceFormik.errors.licenseLink}
                                                        </Form.Text>
                                                    </Form.Group>
                                                </Row>
                                            </div>
                                        </Card.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => {
                                                setShowaddLicenceModal(false)
                                            }}>
                                                Close
                                            </Button>
                                            <Button variant="primary" type="submit">
                                                Save
                                            </Button>
                                        </Modal.Footer>
                                    </Modal.Body>)}
                                </Form>
                            </Modal>
                            <Modal show={showViewLicenceModal} onHide={()=>setShowViewLicenceModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Licenses</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="flex flex-wrap h-96 items-center justify-center overflow-y-scroll flex-row">
                                    {
                                        vehicleData?.licenses?.map((license, i) => (
                                        <div className ={(license?.validMonths === 0 ?"bg-red-100 p-4 w-96 items-center text-sm mb-4 rounded overflow-auto":"bg-green-100 p-4 w-96 items-center text-sm mb-4 rounded overflow-auto")} key={i}>
                                            {license?.validMonths === 0 && vehicleData?.licenses?.length ===1 ? (
                                                <Row>
                                                    <div className="mb-1 text-danger italic flex-row flex gap-x-4 items-center" >
                                                        <AiFillWarning/>
                                                        <div>Renew licence</div>
                                                    </div>
                                                </Row>
                                            ) : ""}
                                            {license?.validMonths === 0 && license?.validDays ===0? (
                                                <Row>
                                                    <div className="mb-1 text-danger italic flex-row flex gap-x-4 items-center" >
                                                        <AiFillWarning/>
                                                        <div>Licence Is Expired</div>
                                                    </div>
                                                </Row>
                                            ) : ""}

                                            <Row className="mb-1">
                                                <Col xs={4}>Reg No:</Col>
                                                <Col xs={8} className="pl-4">
                                                    {vehicleData?.registrationNo}
                                                </Col>
                                            </Row>
                                            <Row className="mb-1">
                                                <Col xs={4}>License No:</Col>
                                                <Col xs={8} className="pl-4">
                                                    {license?.licenseNo}
                                                </Col>
                                            </Row>
                                            <Row className="mb-1">
                                                <Col xs={4}>Annual Fee:</Col>
                                                <Col xs={8} className="pl-4">
                                                    Rs. {license?.annualFee}
                                                </Col>
                                            </Row>
                                            <Row className="mb-1">
                                                <Col xs={4}>Arrears Fee:</Col>
                                                <Col xs={8} className="pl-4">
                                                    Rs. {license?.arrearsFee}
                                                </Col>
                                            </Row>
                                            <Row className="mb-1">
                                                <Col xs={4}>Fines Paid:</Col>
                                                <Col xs={8} className="pl-4">
                                                    Rs. {license?.finesPaid}
                                                </Col>
                                            </Row>
                                            <Row className="mb-1">
                                                <Col xs={4}>Total:</Col>
                                                <Col xs={8} className="pl-4">
                                                   Rs. {parseFloat(license?.annualFee) + parseFloat(license?.arrearsFee) + parseFloat(license?.finesPaid)}
                                                </Col>
                                            </Row>
                                            <Row className="mb-1">
                                                <Col xs={4}>Issued Date:</Col>
                                                <Col xs={8} className="pl-4">
                                                    {license?.issuedDate}
                                                </Col>
                                            </Row>
                                            <Row className="mb-1">
                                                <Col xs={4}>Start Date:</Col>
                                                <Col xs={8} className="pl-4">
                                                    {license?.startDate}
                                                </Col>
                                            </Row>
                                            <Row className="mb-1">
                                                <Col xs={4}>Expiry Date:</Col>
                                                <Col xs={8} className="pl-4">
                                                    {license?.expiryDate}
                                                </Col>
                                            </Row>
                                            <Row className="mb-1">
                                                <Col xs={4}>Valid:</Col>
                                                <Col xs={8} className="pl-4">
                                                    {license?.validMonths} Months {((license?.validMonths)<=0? license?.validDays +" Days":"")}
                                                </Col>
                                            </Row>
                                            <Row className="mt-4">
                                                <Button onClick={()=>{window.open(license?.licenseLink, '_blank');}}>View Licence</Button>
                                            </Row>
                                        </div>
                                    ))}
                                </Modal.Body>
                            </Modal>
                            <Row className="mb-2">
                                <Col xs={4}>Insurance:</Col>
                                <Col xs={8} className="pl-4">
                                    <Col xs={8}>
                                        <Button
                                            className="flex w-18 h-8 justify-center items-center"
                                            variant="outline-success"
                                            style={{ fontSize: "small" }}
                                            onClick={()=>{setShowAddInsuranceModal(true)}}
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            className="flex w-18 h-8 justify-center items-center ml-4"
                                            variant="link"
                                            style={{ fontSize: "small" }}
                                            onClick={() => {
                                                setShowInsuranceModal(true);
                                            }}
                                        >
                                            View
                                        </Button>
                                    </Col>
                                </Col>
                            </Row>
                            <Modal show={showAddInsuranceModal} onHide={()=>{setShowAddInsuranceModal(false)}} size={'lg'}>
                                <Form onSubmit={saveInsuranceFormik.handleSubmit}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Insurance</Modal.Title>
                                    </Modal.Header>
                                        {vehicleData?.insurances[0]?.validMonths !== 0 ?
                                            (<Modal.Body>
                                                <div>Not Expired Current Insurance</div>
                                                <div>There is {vehicleData?.insurances[0]?.validMonths} months have to
                                                    expire current
                                                    Insurance
                                                </div>
                                            </Modal.Body>) :
                                            (
                                                <Modal.Body>
                                                    <Card.Body className="overflow-auto h-full">
                                                        <div className="p-4">
                                                    <Row>
                                                        <Form.Group
                                                            as={Col}
                                                        >
                                                            <Form.Label>
                                                                Certificate No:<span className="text-red-500"> *</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Enter Licence number"
                                                                {...saveInsuranceFormik.getFieldProps("certificateNo")}
                                                                required
                                                            />
                                                            <Form.Text className="text-danger">
                                                                {saveInsuranceFormik.touched.certificateNo && saveInsuranceFormik.errors.certificateNo}
                                                            </Form.Text>
                                                        </Form.Group>
                                                        <Form.Group
                                                            as={Col}
                                                            className="mb-3">
                                                            <Form.Label>
                                                                Annual Fee:<span className="text-red-500"> *</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                min={0}
                                                                type="number"
                                                                placeholder="Enter Fee"
                                                                {...saveInsuranceFormik.getFieldProps("annualFee")}
                                                                required
                                                            />
                                                            <Form.Text className="text-danger">
                                                                {saveInsuranceFormik.touched.annualFee && saveInsuranceFormik.errors.annualFee}
                                                            </Form.Text>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group
                                                            as={Col}
                                                        >
                                                            <Form.Label>
                                                                Insurance Company:<span
                                                                className="text-red-500"> *</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Enter areas fee"
                                                                {...saveInsuranceFormik.getFieldProps("insuranceCompany")}
                                                                required
                                                            />
                                                            <Form.Text className="text-danger">
                                                                {saveInsuranceFormik.touched.insuranceCompany && saveInsuranceFormik.errors.insuranceCompany}
                                                            </Form.Text>
                                                        </Form.Group>
                                                        <Form.Group
                                                            as={Col}
                                                        >
                                                            <Form.Label>
                                                                Issued Date:<span className="text-red-500"> *</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                min={mindateForInsuranceIssuedDate}
                                                                placeholder="Enter areas fee"
                                                                {...saveInsuranceFormik.getFieldProps("issuedDate")}
                                                                required
                                                            />
                                                            <Form.Text className="text-danger">
                                                                {saveInsuranceFormik.touched.issuedDate && saveInsuranceFormik.errors.issuedDate}
                                                            </Form.Text>
                                                        </Form.Group>

                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Form.Group
                                                            as={Col}
                                                            className="mb-3">
                                                            <Form.Label>
                                                                Start Date:<span className="text-red-500"> *</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                min={new Date(new Date(minDateForStartDateInsurance).setDate(new Date(minDateForStartDateInsurance).getDate() - 15)).toISOString().split('T')[0]}
                                                                max={new Date(new Date(minDateForStartDateInsurance).setDate(new Date(minDateForStartDateInsurance).getDate() + 5)).toISOString().split('T')[0]}
                                                                type="date"
                                                                {...saveInsuranceFormik.getFieldProps("startDate")}
                                                                required
                                                            />
                                                            <Form.Text className="text-danger">
                                                                {saveInsuranceFormik.touched.startDate && saveInsuranceFormik.errors.startDate}
                                                            </Form.Text>
                                                        </Form.Group>
                                                        <Form.Group
                                                            as={Col}
                                                            className="mb-3">
                                                            <Form.Label>
                                                                Expire Date:<span className="text-red-500"> *</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                min={new Date(new Date(minDateForStartDateInsurance).setFullYear(new Date(minDateForStartDateInsurance).getFullYear() + 1)).toISOString().split('T')[0]}
                                                                max={new Date(new Date(new Date(minDateForStartDateInsurance).setFullYear(new Date(minDateForStartDateInsurance).getFullYear() + 1)).setDate(new Date(minDateForStartDateInsurance).getDate() + 15)).toISOString().split('T')[0]}
                                                                type="date"
                                                                {...saveInsuranceFormik.getFieldProps("endDate")}
                                                                required
                                                            />
                                                            <Form.Text className="text-danger">
                                                                {saveInsuranceFormik.touched.endDate && saveInsuranceFormik.errors.endDate}
                                                            </Form.Text>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Form.Group
                                                            as={Col}
                                                            className='flex gap-x-4 items-center mb-4'
                                                        >
                                                            <Form.Label>
                                                                Insurance Type:<span className="text-red-500"> *</span>
                                                            </Form.Label>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="outline-secondary" size="sm"
                                                                                 className="h-9 w-52">
                                                                    {saveInsuranceFormik.getFieldProps("insuranceType").value === "" ? "Select Insurance Type" : saveInsuranceFormik.getFieldProps("insuranceType").value}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    {insuranceType?.map((data, i) => (
                                                                        <Dropdown.Item key={i} onClick={() => {
                                                                            saveInsuranceFormik.setFieldValue("insuranceType", data?.type);
                                                                        }}>{data?.type}</Dropdown.Item>))}
                                                                    <Dropdown.Item className="bg-blue-700 text-white"
                                                                                   style={{backgroundColor: 'gray'}}
                                                                                   onClick={() => {
                                                                                       setShowModalAddInsuranceType(true);
                                                                                   }}>
                                                                        New Insurance Type
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                            <Form.Text className="text-danger">
                                                                {saveInsuranceFormik.touched.insuranceType && saveInsuranceFormik.errors.insuranceType}
                                                            </Form.Text>
                                                        </Form.Group>
                                                    </Row>
                                                    <Modal show={showModalAddInsuranceType} onHide={() => {
                                                        setShowModalAddInsuranceType(false)
                                                    }}>
                                                        <Form onSubmit={formikAddNewInsuranceType.handleSubmit}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Add New Insurance Type</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <Form.Group>
                                                                    <Form.Label>
                                                                        Insurance Type:<span
                                                                        className="text-red-500"> *</span>
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Insurance Type"
                                                                        required
                                                                        {...formikAddNewInsuranceType.getFieldProps("type")}
                                                                    />
                                                                </Form.Group>
                                                                <Form.Text className="text-danger">
                                                                    {formikAddNewInsuranceType.touched.type && formikAddNewInsuranceType.errors.type}
                                                                </Form.Text>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" onClick={() => {
                                                                    setShowModalAddInsuranceType(false)
                                                                }}>
                                                                    Close
                                                                </Button>
                                                                <Button variant="primary" type="submit">
                                                                    Save Changes
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Form>
                                                    </Modal>

                                                    <Row className='mb-3'>
                                                        <Form.Group
                                                            as={Col}
                                                        >
                                                            <Form.Label>
                                                                Upload Licence:<span className="text-red-500"> *</span>
                                                            </Form.Label>
                                                            <div className='flex gap-x-2 w-96'>
                                                                <Form.Control
                                                                    type="file"
                                                                    onChange={(e) => {
                                                                        setFileLocation3(e.target.files[0]);
                                                                        setUploadState3(false);
                                                                    }}
                                                                />
                                                                <Button disabled={uploadState3} onClick={() => {
                                                                    setUploadState3(true);
                                                                    setProgressBarVisible3(true);
                                                                    uploadInsurance();
                                                                }}>
                                                                    <div className=" flex items-center gap-x-2">
                                                                        <FaCloudUploadAlt/>
                                                                        <div>Upload</div>
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-row">
                                                                {uploadProgress3 <= 100 && progressBarVisible3 && (
                                                                    <ProgressBar now={uploadProgress3}
                                                                                 label={`${uploadProgress3}%`}
                                                                                 className="mt-3  w-full"/>
                                                                )}
                                                            </div>
                                                            <Form.Text className="text-danger">
                                                                {saveInsuranceFormik.touched.insuranceLink && saveInsuranceFormik.errors.insuranceLink}
                                                            </Form.Text>
                                                        </Form.Group>
                                                    </Row>
                                                </div>
                                            </Card.Body>
                                            </Modal.Body>
                                        )}
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => {
                                            setShowAddInsuranceModal(false)
                                        }}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Save
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                            <Modal show={showInsuranceModal} onHide={() => setShowInsuranceModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Insurance</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="flex flex-wrap h-96 items-center justify-center overflow-y-scroll flex-row">
                                    {
                                        vehicleData?.insurances?.map((data, i) => (
                                            <div className ={(data?.validMonths === 0 ?"bg-red-100 p-4 w-96 items-center text-sm mb-4 rounded overflow-auto":"bg-green-100 p-4 w-96 items-center text-sm mb-4 rounded overflow-auto")} key={i}>
                                                {data?.validMonths === 0 && vehicleData?.insurances?.length ===1 ? (
                                                    <Row>
                                                        <div className="mb-1 text-danger italic flex-row flex gap-x-4 items-center" >
                                                            <AiFillWarning/>
                                                            <div>Renew Insurance</div>
                                                        </div>
                                                    </Row>
                                                ) : ""}
                                                {data?.validMonths === 0 && data?.validDays ===0? (
                                                    <Row>
                                                        <div className="mb-1 text-danger italic flex-row flex gap-x-4 items-center" >
                                                            <AiFillWarning/>
                                                            <div>Insurance Is Expired</div>
                                                        </div>
                                                    </Row>
                                                ) : ""}

                                                <Row className="mb-1">
                                                    <Col xs={4}>Reg No:</Col>
                                                    <Col xs={8} className="pl-4">
                                                        {data?.registrationNo}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-1">
                                                    <Col xs={4}>License No:</Col>
                                                    <Col xs={8} className="pl-4">
                                                        {data?.certificateNo}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-1">
                                                    <Col xs={4}>Issued Date:</Col>
                                                    <Col xs={8} className="pl-4">
                                                        {data?.issuedDate}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-1">
                                                    <Col xs={4}>Start Date:</Col>
                                                    <Col xs={8} className="pl-4">
                                                        {data?.startDate}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-1">
                                                    <Col xs={4}>Expire Date:</Col>
                                                    <Col xs={8} className="pl-4">
                                                        {data?.endDate}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-1">
                                                    <Col xs={4}>Annual Fee:</Col>
                                                    <Col xs={8} className="pl-4">
                                                        Rs. {data?.annualFee}
                                                    </Col>
                                                </Row>
                                                <Row className="mb-1">
                                                    <Col xs={4}>Valid:</Col>
                                                    <Col xs={8} className="pl-4">
                                                        {data?.validMonths} Months {((data?.validMonths)<=0? data?.validDays +" Days":"")}
                                                    </Col>
                                                </Row>
                                                <Row className="mt-4">
                                                    <Button onClick={()=>{window.open(data?.insuranceLink, '_blank');}}>View Licence</Button>
                                                </Row>
                                            </div>
                                        ))}
                                </Modal.Body>
                            </Modal>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default VehicleCard;
