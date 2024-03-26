import React,{useEffect,useState} from 'react'
import { useFormik } from 'formik'
import {Card, Form, Row, Col, Button, Dropdown} from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import {AddPackage, getVehicleType} from '../../ApiService/api';
import { IoMdAdd } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { upDatePackage } from '../../ApiService/api';
import Swal from 'sweetalert2';

export default function AddPackagesEdit() {
    const [vehicleType, setVehicleType] = useState([]);
    const [ID, setID] = useState("");
    const [typeID, setSelectedType] = useState("");
    const [autoOrManual, setAutoOrManual] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const  [isDisabled, setIsDisabled] = useState(false);
    const [vehicleData, setVehicleData] = useState([]);
    const [lessons,setLessons] = useState(0); 
    const [dataTosave, setDataToSave] = useState([]);
    const[error,setError] = useState("");
    const [packageID, setPackageID] = useState("");
    const location = useLocation();
    const [fetchData, setFetchData] = useState(location.state);

    const nav = useNavigate();

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
      const AddType =() =>{
        nav("/studentprofile/trail/addtype");
      };
      const back =()=>{
        nav(-1);
      }
    const formik = useFormik({
        initialValues: {
            packageID: fetchData?.packageID,
            packageName: fetchData?.packageName,
            description: fetchData?.description,
            packagePrice:  fetchData?.packagePrice,
            vehicleData: [],
        },
        validationSchema: Yup.object({
            packageName: Yup.string().required("Required").matches(/^[a-zA-Z]+$/, "Must be a string"),
            description: Yup.string().required("Required"),
            packagePrice: Yup.number().required("Required").min(1000),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {

                const data = {
                    packageID: values.packageID,
                    packageName: values.packageName,
                    description: values.description,
                    packagePrice: values.packagePrice,
                    packageAndVehicleType: []
                };
                Swal.fire({
                    icon: "warning",
                    title: "Are you sure?",
                    text: "Going to save details",}).then(async(result)=>{
                    const response = await upDatePackage(data);
                    if (response.data.code === "00") {
                        Swal.fire({
                            icon: "success",
                            title: "Saved Successfully",
                        });
                    } else if (response.data.code === "06") {
                        Swal.fire({
                            icon: "error",
                            title: "Already Entered This Package",
                        });
                    }
                })
            } catch (error) {
                console.error("Error while saving student details:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Internal error occurred while saving trail permit details",
                });
            } finally {
                setSubmitting(false);
            }
        },
    });
     useEffect(() => {
        const newVehicleData = [...vehicleData];
        newVehicleData[ID] = { typeID, autoOrManual,lessons,packageID};
        setVehicleData(newVehicleData);
      }, [typeID, autoOrManual, ID,lessons]);


    //   useEffect(()=>{
    //     const lessonsCount = [...lessons];
    //     lessonsCount[ID]={lessons};
    //     setLessonCount(lessonsCount);
    //   },[lessons,ID])

    //   useEffect(()=>{
    //     console.log(lessonCountArray)
    //   },[lessonCountArray])
  return (
    <div className="flex flex-1 flex-row justify-center items-center w-screen h-screen" >
        <Card style={{ width: "40em" }} className="mt-5">
            <Card.Body className="overflow-auto h-full">
                <div className='p-4'>
                <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <div className="flex justify-center p-2 bg-neutral-100 rounded-md text-2xl mb-3">
                         Edit Package Details
                    </div>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3"> 
                            <Form.Label>
                                Package Name:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                {...formik.getFieldProps("packageName")}
                                type="text"
                                placeholder=""
                                required
                                disabled
                            />
                            <Form.Text className="text-danger">
                                {formik.touched.packageName && formik.errors.packageName}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                            <Form.Label>
                                About Package:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                 {...formik.getFieldProps("description")}
                                type="text"
                                placeholder=""
                                required
                            />
                            <Form.Text className="text-danger">
                                {formik.touched.description && formik.errors.description}
                            </Form.Text>
                        </Form.Group>
                    </Col>
              </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>
                                Price:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price of package"
                                {...formik.getFieldProps("packagePrice")}
                                required
                                onBlur={(e) => {setIsVisible(false)}}
                            />
                            <Form.Text className="text-danger">
                                {formik.touched.packagePrice && formik.errors.packagePrice}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="mt-4">
                    Add Lessons (Can't Change selected lessons)<span className="text-red-500"></span>
                </div>
                <Row className="mb-3 pl-4 pr-3 items-center mt-2">
                    <table className="border-1">
                    <tr className="border-1">
                      <th className="p-2">Vehicle Category</th>
                      <th colSpan={2}>Vehicle Type</th>
                      <th className='flex items-center justify-center'>Session Count</th>
                    </tr>
                    {
                      vehicleType?.map((item, i) => (
                          <tr key={i}>
                            <td className="pl-3">{item?.typeID}-{item?.typeName} {item?.engineCapacity}</td>
                            <td className="p-2">
                            <Form.Group required>
                                  <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                                      Type
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      {item?.typeAuto && (
                                        <Dropdown.Item
                                            disabled={true}
                                        //{...formik.getFieldProps("vehicleType")}
                                          onClick={() => {
                                            setSelectedType(item?.typeID);
                                            setAutoOrManual("Auto");
                                            setID(i);
                                            setIsVisible(true);
                                            setLessons(vehicleData[i]?.lessons);
                                            //formik.setFieldValue("vehicleType", "Auto");
                                          }}
                                        >
                                          Auto
                                        </Dropdown.Item>
                                      )}
                                      {item?.typeManual && (
                                        <Dropdown.Item
                                            disabled={true}
                                        //{...formik.getFieldProps("vehicleType")}
                                          onClick={() => {
                                            setSelectedType(item?.typeID);
                                            setAutoOrManual("Manual");
                                            setID(i);
                                            setIsVisible(true);
                                            setLessons(vehicleData[i]?.lessons);
                                            //formik.setFieldValue("vehicleType", "Manual");
                                          }}
                                        >
                                          Manual
                                        </Dropdown.Item>
                                      )}
                                      <Dropdown.Item
                                          disabled={true}
                                        onClick={() => {
                                          setSelectedType(null);
                                          setAutoOrManual(null);
                                          setID(i);
                                          setIsVisible(false);
                                          setLessons(0);
                                          setVehicleData([]);
                                          //formik.setFieldValue("vehicleType", "");
                                        }}
                                      >
                                        --
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </Form.Group>
                            </td>
                            <td className="-gap-x-10"><FaUserEdit /></td>
                            <td className='flex flex-row mt-1 items-center justify-center'>
                                <Col md={6}>
                                    <Form.Control
                                        key={i}
                                        type="number"
                                        min={1}
                                        max={50}
                                        defaultValue={0}
                                        placeholder="0"
                                        onBlur={(e) => {
                                            setLessons(e.target.value);
                                            setID(i); 
                                        }}
                                        disabled={true}
                                        required
                                    />
                                </Col>
                            </td>
                          </tr>
                      ))
                    }
                    </table>
                    <Form.Text className="text-danger">
                        {error}
                    </Form.Text>
                </Row>
                <Row className="pl-4 pr-4">
                  <Button onClick={AddType} disabled={true}>
                    <div className="flex items-center justify-center gap-x-2">
                      <IoMdAdd />
                      <div>Add Type</div>
                    </div>
                  </Button>
                </Row>
                <Form.Group>
                        <Row>
                            <div
                                className="flex flex-row justify-between items-center bg-neutral-100 p-2 rounded-md mt-4">
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

                </Form>
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}
