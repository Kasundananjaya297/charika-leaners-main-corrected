import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {FaCloudUploadAlt} from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import {saveTrainerLicence, saveTrainerPermit, uploadFile} from "../../../ApiService/api";
import Swal from "sweetalert2";

function TrainerPermit({data}) {

    //hooks for upload trainer NIC picture
    const [uploadState1, setUploadState1] = useState(true);
    const [fileLocation1, setFileLocation1] = useState("");
    const [uploadProgress1, setUploadProgress1] = useState(0);
    const [submitButton1, setSubmitButton1] = useState(false);
    const[downloadURL1, setDownloadURL1] = useState("");
    const [progressBarVisible1,setProgressBarVisible1] = useState(false);

    const UploadTrainerLicence = async () => {
        try {
            await uploadFile({ Type: "trainer", fileLocation:fileLocation1, Id: formikData.getFieldProps("trainerID").value, setUploadProgress:setUploadProgress1, setUploadState:setUploadState1, setDownloadURL:setDownloadURL1,setProgressBarVisible:setProgressBarVisible1,category: "trainerPermit"});
            setDownloadURL1(downloadURL1);
        } catch (error) {
            console.error("Error in uploadFileTrail:", error);
        }
    }

    const formikData = useFormik({
        //formik for collect trainer permit data
        initialValues:{
            trainerID:data?.trainerID,
            updatedOrIssuedOn:data?.trainerLicenceIssuedON,
            expiryDate:"",
            licenceURL:"",
        },
        validationSchema:Yup.object({
            updatedOrIssuedOn:Yup.date().required("Required"),
            expiryDate:Yup.date().required("Required"),
            licenceURL:Yup.string().required("Required"),
        }),onSubmit: values => {
            Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await saveTrainerPermit(values);
                        if(response?.data?.code==="00"){
                            Swal.fire(
                                {
                                    title:"Saved!",
                                    html:"Trainer Permit has been saved.",
                                    icon:"success",
                                });
                        }else if(response?.data?.code==="06"){
                            Swal.fire({
                                title:"Failed!",
                                html:"Trainer Permit already exists.",
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
    },)

    useEffect(() => {formikData.setFieldValue("licenceURL", downloadURL1);}, [downloadURL1])
    return (
        <div>
            {data?.trainerPermitValidMonths===0 ?
                (<Card>
                <Form onSubmit={formikData.handleSubmit}>
                    <div className="p-4">
                        <Row className="mb-3">
                            <Form.Group as={Col} md={12}>
                                <Form.Label>Updated or Issued On
                                    <span className="text-red-500"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    min = {new Date(data?.trainerLicenceIssuedON).toISOString().split('T')[0]}
                                    max = {new Date().toISOString().split('T')[0]}
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
                                    min={new Date(new Date(formikData.getFieldProps("updatedOrIssuedOn").value).setFullYear(new Date(formikData.getFieldProps("updatedOrIssuedOn").value).getFullYear()+2)).toISOString().split('T')[0]}
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
                                        <Button disabled={uploadState1} onClick={()=>{setUploadState1(true);setProgressBarVisible1(true);UploadTrainerLicence()}}>
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


                    </div>
                </Form>
            </Card>):"Not Expired Current Permit Validity is "+data?.trainerPermitValidMonths+" Months"}
        </div>
    );
}

export default TrainerPermit;