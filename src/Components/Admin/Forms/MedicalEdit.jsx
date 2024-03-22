import React, {useState,useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Card, Col, Form, Row,Dropdown} from "react-bootstrap";
import {useFormik} from "formik";
import { uploadFile,findStudentByID,updateMedicalReport} from '../../ApiService/api';
import * as Yup from "yup";
import { FaCloudUploadAlt } from "react-icons/fa";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { set } from 'lodash';
import Swal from 'sweetalert2';
function MedicalEdit(props) {
    const location = useLocation();
    const [medicalData, setMedicalData] = useState(location.state);
    const stdId = medicalData?.stdID;
    const nav = useNavigate();
    const [studentData, setStudentData] = React.useState({});
    const maxDate = new Date();
    const [errorMsg, setErrorMsg] = useState("");
    maxDate.setFullYear(maxDate.getFullYear() +1 );
    const [submitButton, setSubmitButton] = useState(false);
    const [bloodType,setBloodType]=useState("Select");
    const [uploadState, setUploadState] = useState(true);
    const [fileLocation, setFileLocation] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const[downloadURL, setDownloadURL] = useState("");
    const [progressBarVisible,setProgressBarVisible] = useState(false);
    

    useEffect(() => {formik.setFieldValue("medicalURL", downloadURL);}, [downloadURL])
    const back = () => {
        nav("/studentprofile/medical/view",{state:stdId});
    };
    const formik = useFormik({
        initialValues: {
          stdID: stdId,
          oldSerialNo:medicalData?.serialNo,
          serialNo:medicalData?.serialNo,
          examination:medicalData?.examination,
          bloodType:medicalData?.bloodType,
          medicalURL: medicalData?.medicalURL,
          visionISCorrected:medicalData?.visionISCorrected,
          isSatisfactory:medicalData?.isSatisfactory,
          isSquint:medicalData?.isSquint,
        },
        validationSchema: Yup.object({
        serialNo: Yup.number("Serial number is Number").required("Serial number is required"),
        examination: Yup.date().required("examin date is required"),
        bloodType: Yup.string().required("Blood Type is required"),
        medicalURL: Yup.string().required("Image Uploading is required, In the updating stage u need to select the file again"),
        }),
        onSubmit: async (e, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          formik.setValues({ ...formik.values });
          try {
    
            save(formik.values);
            resetForm();
          } catch (errors) {
            formik.setErrors(errors);
          } finally {
            setSubmitting(false);
          }
        },
      });
      const save = () => {
    
        Swal.fire({
          icon: "warning",
          title: "Are you sure?",
          text: "Going to Update details",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              console.log(formik.values);
              
              //console.log(dataToSave);
                const response = await  updateMedicalReport(formik.values);
              //console.log(response);
              
              if (response.data.code === "00") {
                Swal.fire({
                  icon: "success",
                  title: "Updated Successfully",
                }).then(()=>{nav("/studentprofile/medical/view", { state: stdId })});
              } else if (response.data.code === "06") {
                Swal.fire({
                  icon: "error",
                  title: "Already Entered This Permit",
                });
              } else if (response.data.code === "10") {
                Swal.fire({
                  icon: "error",
                  title: "Current permit not Expired",
                });
              }
            } catch (error) {
              console.error("Error while saving student details:", error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Internal error occurred while saving trail permit details",
              });
            }
          }
        });
      };
      

    const uploadFileTrail = async () => {
        try {
          await uploadFile({ fileLocation, stdId, setUploadProgress, setUploadState, setDownloadURL, setProgressBarVisible, category: "medical"});
    
          console.log("url.............." + downloadURL);
          setDownloadURL(downloadURL);
        } catch (error) {
          console.error("Error in uploadFileTrail:", error);
        }
      }
      useEffect(() => {
        let role = sessionStorage.getItem("role");
        console.log("role: " + role);
        if (!(role === "ADMIN" && sessionStorage.getItem("token") !== null)) {
          nav("/");
        } else if (stdId === null) {
          nav("/studentprofile");
        }
      }, [nav]);
    
      useEffect(() => {
        const fetch = async () => {
          try {
            const response = await findStudentByID(stdId);
            setStudentData(response?.data?.content);
            //console.log(response?.data?.content)
          } catch (e) {
            console.log(e);
          }
        };
        fetch();
      }, [stdId]);

    return (
        <div className="flex flex-1 justify-center  mt-10 w-screen items-center">
            <Card style={{width: "40em"}}>
                <Card.Body>
                    <div className="p-4">
                        <Row>
                            <div className="flex justify-center p-2 bg-neutral-100 rounded-md text-2xl mb-4">
                                Medial Report
                            </div>
                        </Row>

                        <div className="bg-slate-100 w-fit p-3 rounded-md mb-3 text-sm">
                            <table className="gap-y-1">
                                <tr className="">
                                    <td>Student ID:</td>
                                    {" "}
                                    <td className="pl-4">{studentData?.stdID}</td>
                                </tr>
                                <tr className="">
                                    <td>Name:</td>
                                    {" "}
                                    <td className="pl-4">
                                        {studentData?.fname} {studentData?.lname}
                                    </td>
                                </tr>
                                <tr className="">
                                    <td>NIC:</td>
                                    <td className="pl-4">{studentData?.nic}</td>
                                </tr>
                                <tr className="">
                                    <td>Contact:</td>
                                    {" "}
                                    <td className="pl-4">{studentData?.telephone}</td>
                                </tr>
                            </table>
                        </div>
                        <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>
                                        Serial Number:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        {...formik.getFieldProps("serialNo")}
                                        type="Number"
                                        placeholder=""
                                        required
                                        disabled
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.serialNo && formik.errors.serialNo}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>
                                        Examination:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="Date"
                                        {...formik.getFieldProps("examination")}
                                        required
                                        min={new Date(new Date().setMonth(new Date().getMonth() - 12)).toISOString().split('T')[0]}
                                        max={new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString().split('T')[0]}
                                    />
                                    <Form.Text className="text-danger">
                                        {formik.touched.examination && formik.errors.examination}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                            <Row className="mt-3">
                                <Form.Group as={Col} md={6} className="flex items-center gap-x-4">
                                    <Form.Label>
                                        Blood Type:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-secondary" size="sm">
                                            {bloodType}
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
                                </Form.Group>
                            </Row>
                            <Form.Text className="text-danger">
                                {formik.touched.bloodType && formik.errors.bloodType}
                            </Form.Text>
                            <div className="mb-0 mt-3">
                                Details Of Medical Report<span className="text-red-500"> *</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <table className="border-collapse w-full mt-2">
                                    <tbody className="text-sm">
                                    <tr>
                                        <td className="border p-2">
                                            <label>Vission Corrected</label>
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                type="radio"
                                                name="vission"
                                                label="Yes"
                                                checked={formik.getFieldProps("visionISCorrected").value}
                                                required
                                                onChange={(e)=>{formik.setFieldValue("visionISCorrected",true)}}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                type="radio"
                                                name="vission"
                                                checked={!formik.getFieldProps("visionISCorrected").value}
                                                label="No"
                                                required
                                                onChange={(e)=>{formik.setFieldValue("visionISCorrected",false)}}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">
                                            <label>Squint</label>
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                type="radio"
                                                name="Squint"
                                                checked={formik.getFieldProps("isSquint").value}
                                                label="Yes"
                                                required
                                                onChange={(e)=>{formik.setFieldValue("isSquint",true)}}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                type="radio"
                                                name="Squint"
                                                label="No"
                                                checked={!formik.getFieldProps("isSquint").value}
                                                required
                                                onChange={(e)=>{formik.setFieldValue("isSquint",false)}}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">
                                            <label>Hearing</label>
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                name="hearing"
                                                type="radio"
                                                label="Satisfactory"
                                                required
                                                checked={formik.getFieldProps("isSatisfactory").value}
                                                onChange={(e)=>{formik.setFieldValue("isSatisfactory",true)}}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <Form.Check
                                                type="radio"
                                                name="hearing"
                                                label="Not-Satisfactory"
                                                required
                                                checked={!formik.getFieldProps("isSatisfactory").value}
                                                onChange={(e)=>{formik.setFieldValue("isSatisfactory",false)}}
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Row className="">
                                    <Form.Group controlId="formFile" className="mb-2 mt-2" as={Col} md={8}>
                                        <Form.Label>Upload Current Medical Report<span className="text-red-500">*</span></Form.Label>
                                        <div className="flex flex-row gap-x-3">
                                        <Form.Control
                                            type="file"
                                            required={true}
                                            onChange={(e) => {
                                                setFileLocation(e.target.files[0]);
                                                setUploadState(false);
                                            }}
                                        />
                                        <Button variant="primary" disabled={uploadState} onClick={()=>{setUploadState(true);
                                            setProgressBarVisible(true);uploadFileTrail()}}>
                                            <div className="flex items-center gap-x-2">
                                            <FaCloudUploadAlt />
                                            <div>Upload</div>
                                            </div>
                                        </Button>
                                        </div>
                                        {uploadProgress <= 100 && progressBarVisible && (
                                            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} className="mt-3" />
                                        )}
                                    </Form.Group>
                                    <Form.Text className="text-danger">
                                        {formik.touched.medicalURL && formik.errors.medicalURL}
                                    </Form.Text>
                                    </Row>
                                <Form.Text
                                    className="text-danger items-start flex justify-start text-left flex-row w-full">
                                    {errorMsg}
                                </Form.Text>

                            <Row>
                                <div
                                    className="flex flex-row justify-between items-center bg-neutral-100 p-3 rounded-md mt-4">
                                    <Button variant="danger" onClick={back}>
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        disabled={submitButton}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default MedicalEdit;