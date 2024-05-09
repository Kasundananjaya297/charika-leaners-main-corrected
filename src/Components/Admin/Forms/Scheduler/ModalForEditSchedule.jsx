import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import * as Yup from "yup";
import {Button} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import {AiFillWarning} from "react-icons/ai";
import {
    getAllVehicleClasses,
    getTrainerByVehicleClass,
    getVehicleByClass,
    saveSchedules, updateSchedules
} from "../../../ApiService/api";
import Swal from "sweetalert2";

function ModalForEditSchedule({selectedDate,interrupt,setInterrupt,eventDetails}) {

    const[vehicleClasses, setVehicleClasses] = useState([]);
    const [vehicleData, setVehicleData] = useState([]);
    const [trainers, setTrainers] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await getAllVehicleClasses();
                if(response?.data?.code ==="00"){
                    setVehicleClasses(response.data?.content);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, []);


    const formik = useFormik({
        initialValues: {
            schedulerID: eventDetails.schedulerID,
            title: eventDetails.titleFetch,
            date: new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate())).toISOString().split('T')[0],
            startTime: new Date(eventDetails.start).toTimeString().split(' ')[0],
            endTime: new Date(eventDetails.end).toTimeString().split(' ')[0],
            studentCount: eventDetails.studentCount,
            trainerID: eventDetails.trainerID,
            registrationNo: eventDetails.registrationNo,
            start: eventDetails.start,
            end: eventDetails.end,
            vehicleClass: eventDetails.vehicleClass,
        },validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            date: Yup.string().required("Required"),
            startTime: Yup.string().required("Required"),
            endTime: Yup.string().required("Required"),
            trainerID: Yup.string().required("Required"),
            studentCount: Yup.string().required("Required"),
            registrationNo: Yup.string().required("Required"),
            vehicleClass: Yup.string().required("Required"),
        }),
        onSubmit: values => {
            console.log(values);
            try {
                Swal.fire({
                    icon:"warning",
                    title:"Are you sure?",
                    showCancelButton:true,
                }).then(async (result)=>{
                    if(result.isConfirmed){
                        const response = await updateSchedules(values);
                        console.log("++++++++++++++++++++++++++++",response)
                        if(response?.data?.code ==="00"){
                            Swal.fire({
                                icon:"success",
                                title:"Schedule Added Successfully"
                            });
                            setInterrupt(!interrupt);
                        }else if(response?.data?.code ==="06"){
                            Swal.fire({
                                icon:"warning",
                                title:"Some of the schedules are overlapped",
                                text:"Then overlapped schedules are not added",
                            })
                        }else if(response?.data?.code ==="10"){
                            Swal.fire({
                                icon:"error",
                                title:"Error",
                                text:"Trainer/Vehicle is already assigned for another schedule",
                            })
                        }
                    }
                })
            }catch (e) {
                Swal.fire({
                    icon:"error",
                    title:"Something went wrong",
                    text:"Please try again"
                })
            }
        }
    });


    //set Start
    useEffect(() => {
        const startDateTimeString = `${formik.values.date}T${formik.values.startTime}`;
        const startDateTime = new Date(startDateTimeString);
        formik.setFieldValue("start", startDateTime);
    }, [formik.values.date, formik.values.startTime,eventDetails]);

    //set End
    useEffect(() => {
        const endDateTimeString = `${formik.values.date}T${formik.values.endTime}`;
        const endDateTime = new Date(endDateTimeString);
        formik.setFieldValue("end", endDateTime);
    }, [formik.values.date, formik.values.endTime,eventDetails]);


    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await getVehicleByClass(formik.values.vehicleClass);
                if(response?.data?.code ==="00"){
                    setVehicleData(response.data?.content);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, [formik.values.vehicleClass]);
    //get trainers by vehicle Class
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await getTrainerByVehicleClass(formik.values.vehicleClass);
                if(response?.data?.code ==="00"){
                    setTrainers(response.data?.content);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, [formik.values.vehicleClass]);


    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group
                        as={Col}
                    >
                        <Form.Label>
                            Title<span className="text-red-500"> *</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            {...formik.getFieldProps("title")}
                            required
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.title && formik.errors.title}
                        </Form.Text>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group
                        as={Col}
                    >
                        <Form.Label>
                            Date<span className="text-red-500"> *</span>
                        </Form.Label>
                        <Form.Control
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            {...formik.getFieldProps("date")}
                            required
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.date && formik.errors.date}
                        </Form.Text>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group
                        as={Col}
                    >
                        <Form.Label>
                            Starts<span className="text-red-500"> *</span>
                        </Form.Label>
                        <Form.Control
                            type="time"
                            step={1800}
                            min ={"07:00"}
                            max ={"18:00"}
                            {...formik.getFieldProps("startTime")}
                            required
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.startTime && formik.errors.startTime}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group
                        as={Col}
                    >
                        <Form.Label>
                            Ends<span className="text-red-500"> *</span>
                        </Form.Label>
                        <Form.Control
                            type="time"
                            step={1800}
                            min={(formik.values.startTime+1)}
                            {...formik.getFieldProps("endTime")}
                            required
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.endTime && formik.errors.endTime}
                        </Form.Text>
                    </Form.Group>
                </Row>
                <table className='p-4'>
                    <tr>
                        <td>Vehicle Class<span className="text-red-500"> *</span></td>
                        <td className='pl-4'>
                            <Dropdown>
                                <Dropdown.Toggle variant='outline-secondary' id="dropdown-basic" size='sm'>
                                    {formik.values.vehicleClass || "Select"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='overflow-y-scroll h-24'>
                                    {vehicleClasses.map((item,i) => (
                                        <Dropdown.Item
                                            onClick={() => {
                                                formik.setFieldValue("vehicleClass", item?.typeID)
                                            }}>
                                            <div className='text-sx' style={{fontSize: 'smaller'}}>
                                                {`${item?.typeID} - ${item?.typeName}`}
                                            </div>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Text className="text-danger">
                                {formik.touched.registrationNo && formik.errors.registrationNo}
                            </Form.Text>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            Vehicle <span className='text-danger'> *</span>
                        </td>
                        <td className='pl-4'>
                            <Dropdown>
                                <Dropdown.Toggle variant='outline-secondary' id="dropdown-basic" size='sm'>
                                    {formik.values.registrationNo || "Select"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='overflow-y-scroll h-24'>
                                    {vehicleData?.map((item, i) =>
                                        <Dropdown.Item className='flex' onClick={()=>formik.setFieldValue("registrationNo",item?.registrationNo)}>
                                            <div className='w-40'>
                                                <div className='flex items-center justify-between'>
                                                    <div className='text-sx font-bold' style={{ fontSize: 'smaller' }}>
                                                        {`${item?.registrationNo}`}
                                                    </div>
                                                    <div>
                                                        <div className='text-xs' style={{ fontSize: 'smaller' }}>
                                                            Sts: {item?.vehicleStatus}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <div className='flex text-xs italic'>
                                                        <div>
                                                            {item?.make}
                                                        </div>
                                                        <div className='pl-1'>
                                                            {item?.modal}
                                                        </div>
                                                    </div>
                                                    <div className='text-xs italic' style={{ fontSize: 'smaller' }}>
                                                        trns: {item?.autoOrManual}
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Trainers<span className='text-danger'> *</span></td>
                        <td className='pl-4'>
                            <Dropdown>
                                <Dropdown.Toggle variant='outline-secondary' id="dropdown-basic" size='sm'>
                                    {formik.values.trainerID || "Select"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='overflow-y-scroll h-24'>
                                    {trainers.map((item, i) =>(
                                        <Dropdown.Item onClick={() => formik.setFieldValue("trainerID", item?.trainerID)}>
                                            <div className='text-sx' style={{fontSize: 'smaller'}}>
                                                <div>
                                                    {`${item?.fname}`}
                                                </div>
                                                <div className='italic'>
                                                    {item?.nic}
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                </table>
                <Row className="mb-3">
                    <Form.Group
                        as={Col}
                    >
                        <Form.Label>
                            Student Count<span className="text-red-500"> *</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Student Count"
                            {...formik.getFieldProps("studentCount")}
                            required
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.studentCount && formik.errors.studentCount}
                        </Form.Text>
                    </Form.Group>

                </Row>
                <Row className="mb-3 p-4">
                    <Button type="submit">Add Schedule</Button>
                </Row>
            </Form>

        </div>
    );
}

export default ModalForEditSchedule;
