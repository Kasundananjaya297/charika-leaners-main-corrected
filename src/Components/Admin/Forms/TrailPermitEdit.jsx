import React, { useEffect, useState } from "react";
import {Card, Form, Row, Col, Button, Dropdown} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {findStudentByID, getVehicleType, saveTrailPermit, uploadFile,UpdateTrailPermit} from "../../ApiService/api";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { IoMdAdd } from "react-icons/io";




// `student/${Id}/${fileLocation.name}`

export default function TrailPermitEdit() {
  const location = useLocation();
  const [permidData, setPermidData] = useState(location.state);
  const stdId = permidData[0]?.stdID;
  // console.log("+++++++++++++++");
  // console.log(permidData[0]);
  const [studentData, setStudentData] = useState("");
  const [submitButton, setSubmitButton] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const maxDate = new Date();
  const [uploadState, setUploadState] = useState(true);
  const [fileLocation, setFileLocation] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const[downloadURL, setDownloadURL] = useState("");
  const [progressBarVisible,setProgressBarVisible] = useState(false);
  const [vehicleType, setVehicleType] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [autoOrManual, setAutoOrManual] = useState("");
  const [ID, setID] = useState("");
  const [isVisible, setIsVisible] = useState(false);


  const handleTypeSelection = (typeID, type, i) => {
    setAutoOrManual(type);
    setSelectedType(typeID);
    console.log(typeID + " " + type + " " + i);
  }





  maxDate.setFullYear(maxDate.getFullYear() +1 );

  //uploading to firebase
  const uploadFileTrail = async () => {
    try {
      await uploadFile({ fileLocation, stdId, setUploadProgress, setUploadState, setDownloadURL, setProgressBarVisible });

      console.log("url.............." + downloadURL);
    } catch (error) {
      console.error("Error in uploadFileTrail:", error);
    }
  }
  useEffect(() => {
    if(downloadURL !== ""){
      formik.setFieldValue("downURL", downloadURL);
    }

    }, [downloadURL])
  const formik = useFormik({
    initialValues: {
      stdID: stdId,
      examDate: permidData[0]?.examDate,
      serialNo: permidData[0]?.serialNo,
      expDate: permidData[0]?.expDate,
      downURL:permidData[0]?.downURL,
    },
    validationSchema: Yup.object({
      examDate: Yup.date().required("Exam date is required"),
      serialNo: Yup.number("Serial number is Number").required(
          "Serial number is required"
      ),
      expDate: Yup.date().required("Exam date is required"),
      downURL: Yup.string().required("Image Uploading is required, In the updating stage u need to select "),
      vehicleType : Yup.string().required("Vehicle Type is required, In the updating stage u need to select"),
    }),
    onSubmit: async (e, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      formik.setValues({ ...formik.values });
      console.log(formik.values);
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
      text: "Going to save details",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const permitAndVehicleType = vehicleData.filter(item => 
            item.autoOrManual !== undefined &&
            item.autoOrManual !== null &&
            item.autoOrManual !== ''
          );
          
          const dataToSave = {
            stdID: stdId,
            serialNo: formik.values.serialNo,
            examDate: formik.values.examDate,
            expDate: formik.values.expDate,
            downURL: formik.values.downURL,
            permitAndVehicleType: permitAndVehicleType
          };
          
          console.log(dataToSave);
          
          const response = await UpdateTrailPermit(dataToSave);
          console.log(response);
          
          if (response.data.code === "00") {
            Swal.fire({
              icon: "success",
              title: "Updated Successfully",
            }).then(()=>{nav("/studentprofile/trailView", { state: stdId })});
            
          } else if (response.data.code === "01") {
            Swal.fire({
              icon: "error",
              title: "No Data founded",
            });
          } else if (response.data.code === "10") {
            Swal.fire({
              icon: "error",
              title: "You try to update the other student permit",
            });
          }
        } catch (error) {
          console.error("Error while saving student details:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Axios Error",
          });
        }
      }
    });
  };
  


  // const save = (trailPermitDetails) => {
  //   Swal.fire({
  //     icon: "warning",
  //     title: "Are you sure?",
  //     text: "Going to save details",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const response = await saveTrailPermit(trailPermitDetails); // call api.saveStudent
  //         //console.log(response);
  //         // Check the response and handle it accordingly
  //         if (response.data.code === "00") {
  //           Swal.fire({
  //             icon: "success",
  //             title: "Saved Successfully",
  //           });
  //         } else if (response.data.code === "06") {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Already Entered This Permit",
  //           });
  //         }else if(response.data.code === "10"){
  //           Swal.fire({
  //             icon: "error",
  //             title: "Current permit not Expired",
  //           });}
  //       } catch (error) {
  //         console.error("Error while saving student details:", error);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: "Internal error occurred while saving trail permit details",
  //         });
  //       }
  //     }
  //   });
  // };

  // useEffect(() => {
  //   const atLeastOneSelected = () => {
  //     const { b1M, bM, bA, a1M, a1A, aM } = formik.values;
  //     if ((b1M || bM || bA || a1M || a1A || aM) !== true) {
  //       setSubmitButton(true);
  //       setErrorMsg("At least one need to be selected");
  //     } else {
  //       setSubmitButton(false);
  //       setErrorMsg("");
  //     }
  //   };
  //   atLeastOneSelected();
  // }, [formik.values]);

  const nav = useNavigate();
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
        console.log(response?.data?.content)
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, [stdId]);

  const back = () => {
    nav("/studentprofile/trailView", { state: stdId });
  };
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
  },[stdId]);
  const AddType =() =>{
    nav("/studentprofile/trail/addtype",{ state: stdId });
  };
  // useEffect(() => {
  //   const dataArray = [];
  //   const data = {selectedType, autoOrManual};
  //   dataArray[ID].push(data);
  //   console.log(dataArray);
  // }, [selectedType, autoOrManual]);
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    const newVehicleData = [...vehicleData];
    newVehicleData[ID] = { selectedType, autoOrManual };
    setVehicleData(newVehicleData);
  }, [selectedType, autoOrManual, ID]);

  useEffect(() => {
    console.log(vehicleData)
    
  }, [vehicleData]);

  return (
      <div className="flex flex-1 justify-center bg-neutral-100 mt-10 w-screen items-center">
        <Card style={{ width: "40em" }} className="mb-4">
          <Card.Body>
            <div className="p-4">
              <Row>
                <div className="flex justify-center p-2 bg-neutral-100 mt-3 rounded-md text-2xl mb-8">
                  Trail Permit
                </div>
              </Row>

              <div className="bg-slate-100 w-fit p-3 rounded-md mb-3 text-sm">
                <table className="gap-y-1">
                  <tr className="">
                    <td>Student ID:</td>{" "}
                    <td className="pl-4">{studentData?.stdID}</td>
                  </tr>
                  <tr className="">
                    <td>Name:</td>{" "}
                    <td className="pl-4">
                      {studentData?.fname} {studentData?.lname}
                    </td>
                  </tr>
                  <tr className="">
                    <td>NIC:</td> <td className="pl-4">{studentData?.nic}</td>
                  </tr>
                  <tr className="">
                    <td>Contact:</td>{" "}
                    <td className="pl-4">{studentData?.telephone}</td>
                  </tr>
                </table>
              </div>
              <Form onSubmit={formik.handleSubmit}>
                <Row className="">
                  <Form.Group as={Col} md={6}>
                    <Form.Label>
                      Serial Number:<span className="text-red-500"> *</span>
                    </Form.Label>
                    <Form.Control
                        type="Number"
                        placeholder=""
                        {...formik.getFieldProps("serialNo")}
                        required
                        disabled={true}
                    />
                    <Form.Text className="text-danger">
                      {formik.touched.serialNo && formik.errors.serialNo}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>
                      Exam Date:<span className="text-red-500"> *</span>
                    </Form.Label>
                    <Form.Control
                        type="Date"
                        {...formik.getFieldProps("examDate")}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        max={maxDate.toISOString().split('T')[0]}
                    />
                    <Form.Text className="text-danger">
                      {formik.touched.examDate && formik.errors.examDate}
                    </Form.Text>
                  </Form.Group>
                </Row>

                <Row className="mt-3">
                  <Form.Group as={Col} md={6}>
                    <Form.Label>
                      Exp Date:<span className="text-red-500"> *</span>
                    </Form.Label>
                    <Form.Control
                        type="date"
                        placeholder=""
                        required
                        {...formik.getFieldProps("expDate")}
                        min={new Date().toISOString().split('T')[0]}
                        max={maxDate.toISOString().split('T')[0]}
                        onSelect={() => {
                          setIsVisible(true)
                        }}
                    />
                    <Form.Text className="text-danger">
                      {formik.touched.expDate && formik.errors.expDate}
                    </Form.Text>
                  </Form.Group>
                </Row>

                <div className="mb-0 mt-3">
                  Details Of leaner permit<span className="text-red-500"> *</span>
                </div>
                <Row className="mb-3 pl-4 pr-3 items-center mt-2">
                  <table className="border-1">
                    <tr className="border-1">
                      <th className="p-2">Vehicle Category</th>
                      <th>Vehicle Type</th>
                    </tr>
                    {
                      vehicleType?.map((item, i) => (
                          <tr key={i}>
                            <td className="pl-3">{item?.typeID}-{item?.typeName} {item?.engineCapacity}</td>
                            <td className="p-1">
                            <Form.Group controlId={`dropdown-${i}`} required>
                                  <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                                      Type
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      {item?.typeAuto && (
                                        <Dropdown.Item
                                        {...formik.getFieldProps("vehicleType")}
                                          onClick={() => {
                                            setSelectedType(item?.typeID);
                                            setAutoOrManual("Auto");
                                            setID(i);
                                            setIsVisible(true);
                                            formik.setFieldValue("vehicleType", "Auto");
                                          }}
                                        >
                                          Auto
                                        </Dropdown.Item>
                                      )}
                                      {item?.typeManual && (
                                        <Dropdown.Item
                                        {...formik.getFieldProps("vehicleType")}
                                          onClick={() => {
                                            setSelectedType(item?.typeID);
                                            setAutoOrManual("Manual");
                                            setID(i);
                                            setIsVisible(true);
                                            formik.setFieldValue("vehicleType", "Manual");
                                          }}
                                        >
                                          Manual
                                        </Dropdown.Item>
                                      )}
                                      <Dropdown.Item
                                        onClick={() => {
                                          setSelectedType(null);
                                          setAutoOrManual(null);
                                          setID(i);
                                          setIsVisible(false);
                                          formik.setFieldValue("vehicleType", "");
                                        }}
                                      >
                                        --
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </Form.Group>
                            </td>
                          </tr>
                      ))
                    }
                  </table>
                  <Form.Text className="text-danger">
                      {formik.touched.expDate && formik.errors.vehicleType} 
                  </Form.Text>
                </Row>
                <Row className="pl-4 pr-4">
                  <Button onClick={AddType}>
                    <div className="flex items-center justify-center gap-x-2">
                      <IoMdAdd />
                      <div>Add Type</div>
                    </div>
                  </Button>
                </Row>

                <Row className="">
                  <Form.Group controlId="formFile" className="mb-2 mt-2" as={Col} md={8}>
                    <Form.Label>Upload Current Trail Permit</Form.Label>
                    <div className="flex flex-row gap-x-3">
                      <Form.Control
                          type="file"
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
                    {formik.touched.downURL && formik.errors.downURL}
                  </Form.Text>
                </Row>
                <Row>
                  <div className="flex flex-row justify-between items-center bg-neutral-100 p-2 rounded-md mt-4">
                    <Button variant="danger" onClick={back}>
                      Back
                    </Button>
                    <Button
                         type="submit"
                        variant="success"
                        //onClick={save}
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
