import {useFormik} from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {FaCloudUploadAlt, FaUserEdit} from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import React, {useEffect, useState} from "react";
import {getVehicleType, saveTrainerLicence, uploadFile} from "../../../ApiService/api";
import Dropdown from "react-bootstrap/Dropdown";
import {IoMdAdd} from "react-icons/io";
import {Modal} from "react-bootstrap";
import AddVehicleTypeEdit from "../AddVehicleTypeEdit";
import AddVehicleType from "../AddVehicleType";
import Swal from "sweetalert2";


function TrainerLicence({trainerID,trainerData}) {
    //hooks for upload trainer NIC picture
    const [uploadState1, setUploadState1] = useState(true);
    const [fileLocation1, setFileLocation1] = useState("");
    const [uploadProgress1, setUploadProgress1] = useState(0);
    const [submitButton1, setSubmitButton1] = useState(false);
    const[downloadURL1, setDownloadURL1] = useState("");
    const [progressBarVisible1,setProgressBarVisible1] = useState(false);


    //fetch vehicle Type
    const [vehicleType, setVehicleType] = useState([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState([]);
    const [ID,setID] = useState("");
    const [typeID, setTypeID] = useState('');
    const [parseID,setParseID] = useState('');
    const [showModalAddVehicleType, setShowModalAddVehicleType] = useState(false);
    const [showModalEditVehicle, setEditVehicleModal] = useState(false);

    const [filteredDatatoSave,setFilteredDatatoSave] = useState([]);

    const minDate = trainerData?.trainerDrivingLicences[0]?.monthsForExpiireHevyDuty === -1 && trainerData?.trainerDrivingLicences[0]?.expiryDate !== undefined ?
        new Date(trainerData?.trainerDrivingLicences[0]?.expiryDate).toISOString().split('T')[0]:
        new Date(new Date(trainerData?.licenceIssuedOn).setFullYear(new Date(trainerData?.licenceIssuedOn).getFullYear()-4)).toISOString().split('T')[0];



    const UploadDrivingLicence = async () => {
        try {
            await uploadFile({ Type: "trainer", fileLocation:fileLocation1, Id: formikData.getFieldProps("trainerID").value, setUploadProgress:setUploadProgress1, setUploadState:setUploadState1, setDownloadURL:setDownloadURL1,setProgressBarVisible:setProgressBarVisible1,category: "drivingLicence"});
            setDownloadURL1(downloadURL1);
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    }

      useEffect(() => {formikData.setFieldValue("licenceURL", downloadURL1);}, [downloadURL1])

    const formikData = useFormik({
        initialValues:{
            updatedOrIssuedOn:minDate,
            expiryDate:"",
            licenceURL:"",
            trainerID:trainerID,
            trainerDrivingLicenceVehicles:"",
        },validationSchema:Yup.object(
            {
                updatedOrIssuedOn:Yup.date().required("Updated or Issued On is required"),
                expiryDate: Yup.date().required("Expiry Date is required"),
                licenceURL:Yup.string().required("Licence URL is required"),
                trainerDrivingLicenceVehicles:Yup.array().required("required").min(1,"At least one vehicle type is required")
            }
        )
        ,onSubmit:async (values)=>{
            console.log(values)
            Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await saveTrainerLicence(values);
                        if(response?.data?.code==="00"){
                            Swal.fire(
                                {
                                    title:"Saved!",
                                    html:"Trainer Licence has been saved.",
                                    icon:"success",
                                });
                        }else if(response?.data?.code==="06"){
                            Swal.fire({
                                title:"Failed!",
                                html:"Trainer Licence already exists.",
                                icon:"error"
                            });
                        }
                    } catch (error) {
                        Swal.fire({
                            title:"Failed!",
                            icon:"error"
                        });
                    }
                }

            })
        }
    })

    useEffect( () => {
        const fetchData = async ()=>{
            const response = await getVehicleType();
            if(response?.data?.code ==="00"){
                setVehicleType(response?.data?.content);
            }
        }
        fetchData();
    }, []);
    //hook for collect vehicle type List
    useEffect(() => {
        const newArray = [...selectedVehicleType];
        newArray[ID] = {typeID,trainerID};
        setSelectedVehicleType(newArray);
    }, [ID,typeID]);


    //filter selected vehicle type
    useEffect(() => {
        const filter = selectedVehicleType.filter((item) => item?.typeID !== "" && item?.updatedOrIssuedOn !== ""&& item?.trainerID !== undefined);
        setFilteredDatatoSave(filter);
    }, [selectedVehicleType]);
    useEffect(()=>{
        formikData.setFieldValue("trainerDrivingLicenceVehicles",filteredDatatoSave);
    },[filteredDatatoSave])

    return (
        <div>
            {trainerData?.trainerDrivingLicences[0]?.expiryDate === undefined || trainerData?.trainerDrivingLicences[0]?.monthsForExpiireHevyDuty === 0 || trainerData?.trainerDrivingLicences[0]?.monthsForExpireLightWeight === 0 ?
                <Card>
                <Form onSubmit={formikData.handleSubmit}>
                <Card.Body className="overflow-auto h-full">
                    <div className="p-4">
                        <Row className="mb-3">
                            <Form.Group as={Col} md={12}>
                                <Form.Label>Updated or Issued On
                                    <span className="text-red-500"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    min={minDate}
                                    {...formikData.getFieldProps("updatedOrIssuedOn")}
                                />
                                <Form.Text className="text-danger">
                                    {formikData.touched.updatedOrIssuedOn && formikData.errors.updatedOrIssuedOn}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={12}>
                                <Form.Label>Expiry Date
                                    <span className="text-red-500"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    min={new Date(new Date(formikData.getFieldProps("updatedOrIssuedOn").value).setFullYear(new Date(formikData.getFieldProps("updatedOrIssuedOn").value).getFullYear()+8)).toISOString().split('T')[0]}
                                    {...formikData.getFieldProps("expiryDate")}
                                />
                                <Form.Text className="text-danger">
                                    {formikData.touched.expiryDate && formikData.errors.expiryDate}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md={12}>
                                <Form.Label>Driving Licence PDF<span className="text-red-500">*</span></Form.Label>
                                <div className="flex flex-col">
                                    <div className="flex gap-x-3 ">
                                        <Form.Control
                                            type="file"
                                            required={true}
                                            onChange={(e) => {
                                                setFileLocation1(e.target.files[0]);
                                                setUploadState1(false);
                                            }}
                                        />
                                        <Button disabled={uploadState1} onClick={()=>{setUploadState1(true);setProgressBarVisible1(true);UploadDrivingLicence()}}>
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
                                    {formikData.touched.licenceURL && formikData.errors.licenceURL}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Row className='mt-3'>
                            <Form.Group as={Col} md={12}>
                                <Form.Label>Select Vehicle Classes In Licence<span className="text-red-500"> *</span></Form.Label>
                            </Form.Group>
                            <Row className="mb-3 pl-4 pr-3 items-center mt-2 h-40 flex-row flex overflow-y-auto overflow-x-hidden">
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
                                                    <Form.Group  required>
                                                        <Form.Check
                                                            onChange={(e) => {
                                                                if(e.target.checked === true){
                                                                    setID(i)
                                                                    setTypeID(item?.typeID);
                                                                }else{
                                                                    setID(i)
                                                                    setTypeID("");
                                                                }
                                                            }}
                                                        />
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
                            </Row>
                            <Form.Text className="text-danger">
                                {formikData.touched.trainerDrivingLicenceVehicles && formikData.errors.trainerDrivingLicenceVehicles}
                            </Form.Text>
                            <Row className='items-center justify-center flex mt-3'>
                                <Button onClick={()=>{setShowModalAddVehicleType(true)}} className='ml-6'>
                                    <div className="flex items-center justify-center gap-x-2">
                                        <IoMdAdd/>
                                        <div>Add Type</div>
                                    </div>
                                </Button>
                            </Row>
                            <Form.Group className="mt-4">
                                <Row>
                                    <div
                                        className="flex flex-row justify-end items-center bg-neutral-100 p-2 rounded-md">
                                        <Button
                                            type="submit"
                                            variant="success"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </Row>
                            </Form.Group>
                            <Modal show={showModalEditVehicle} onHide={()=>{setEditVehicleModal(false)}}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Vehicle Type</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddVehicleTypeEdit setShowModal={setEditVehicleModal} data={vehicleType[parseID]}/>
                                </Modal.Body>
                            </Modal>
                            <Modal show={showModalAddVehicleType} onHide={()=>{setShowModalAddVehicleType(false)}}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add New Vehicle type</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="shadow-blue-300">
                                    <AddVehicleType setShowModal={setShowModalAddVehicleType}/>
                                </Modal.Body>
                            </Modal>
                        </Row>
                    </div>
                </Card.Body>
            </Form>
            </Card>:
                <div>
                    {(trainerData?.trainerDrivingLicences[0]?.monthsForExpiireHevyDuty !== -1?
                        <div>
                            <div>
                                Light Weight Licence part has {(parseInt(trainerData?.trainerDrivingLicences[0]?.monthsForExpireLightWeight / 12))} Years and {(trainerData?.trainerDrivingLicences[0]?.monthsForExpireLightWeight % 12)} Months to Expire {(trainerData?.trainerDrivingLicences[0]?.monthsForExpireLightWeight<=1?trainerData?.trainerDrivingLicences[0]?.daysForExpireLightWeight:"")}
                            </div>
                            <div>
                                Heavy Weight Licence part has {(parseInt(trainerData?.trainerDrivingLicences[0]?.monthsForExpiireHevyDuty / 12))} Years and {(trainerData?.trainerDrivingLicences[0]?.monthsForExpiireHevyDuty % 12)} Months to Expire {(trainerData?.trainerDrivingLicences[0]?.monthsForExpiireHevyDuty <=1?trainerData?.trainerDrivingLicences[0]?.daysForExpireHeavyDuty:"")}
                            </div>
                        </div>
                        :
                        <div>
                            Light Weight Licence part has {(parseInt(trainerData?.trainerDrivingLicences[0]?.monthsForExpireLightWeight / 12))} Years and {(trainerData?.trainerDrivingLicences[0]?.monthsForExpireLightWeight % 12)} Months to Expire {(trainerData?.trainerDrivingLicences[0]?.monthsForExpireLightWeight<=1?trainerData?.trainerDrivingLicences[0]?.daysForExpireLightWeight:"")}
                        </div>
                    )}
                </div>
            }

        </div>
    );
}

export default TrainerLicence;
