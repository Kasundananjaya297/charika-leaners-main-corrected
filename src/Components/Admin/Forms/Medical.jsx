import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Card, Col, Form, Row,Dropdown} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
function Medical(props) {
    const nav = useNavigate();
    const location = useLocation();
    const stdID = location.state;
    const [studentData, setStudentData] = React.useState({});
    const maxDate = new Date();
    const [errorMsg, setErrorMsg] = useState("");
    maxDate.setFullYear(maxDate.getFullYear() +1 );
    const [submitButton, setSubmitButton] = useState(false);
    const [bloodType,setBloodType]=useState("Select");
    const back = () => {
        nav("/studentprofile");
    };
    const formik = useFormik({
        initialValues: {
            stdID: stdID,
            examDate: "",
            serialNo: "",
            expDate: "",
            b1M: true,
            bM: false,
            bA: false,
            a1M: false,
            a1A: false,
            aM: false,
        },
        validationSchema: Yup.object({
            examDate: Yup.date().required("Exam date is required"),
            serialNo: Yup.number("Serial number is Number").required(
                "Serial number is required"
            ),
            expDate: Yup.date().required("Exam date is required"),
        }),
        onSubmit: async (e, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            formik.setValues({ ...formik.values });
            console.log(formik.values);
            try {

                resetForm();
            } catch (errors) {
                formik.setErrors(errors);
            } finally {
                setSubmitting(false);
            }
        },
    });


    return (
        <div className="flex flex-1 justify-center  mt-10 w-screen items-center">
            <Card style={{width: "40em"}}>
                <Card.Body>
                    <div className="p-4">
                        <Row>
                            <div className="flex justify-center p-2 bg-neutral-100 rounded-md text-2xl mb-4">
                                Trail Permit
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
                            <Row className="">
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>
                                        Serial Number:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="Number"
                                        placeholder=""
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md={6}>
                                    <Form.Label>
                                        Examination:<span className="text-red-500"> *</span>
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
                                <Form.Group as={Col} md={6} className="flex items-center gap-x-4">
                                    <Form.Label>
                                        Blood Type:<span className="text-red-500"> *</span>
                                    </Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-secondary" size="sm">
                                            {bloodType}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={()=>{setBloodType("A+")}} >A+</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{setBloodType("A-")}}>A-</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{setBloodType("B+")}}>B+</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{setBloodType("B-")}}>B-</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{setBloodType("O+")}}>O+</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{setBloodType("O-")}}>O-</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{setBloodType("AB+")}}>AB+</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{setBloodType("AB-")}}>AB-</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Row>

                            <div className="mb-0 mt-3">
                                Details Of leaner permit<span className="text-red-500"> *</span>
                            </div>
                            <div className="flex flex-col items-center  pr-4">
                                <table className="border-collapse w-full mt-2">
                                    <thead>
                                    <tr>
                                        <th className="border p-2">
                                            <label>Vehicle Type</label>
                                        </th>
                                        <th className="border p-2">Manual</th>
                                        <th className="border p-2">Auto</th>
                                        <th className="border p-2">None</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                    <tr>
                                        <td className="border p-2">
                                            <label>B1 - Motor Tricycle</label>
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="radio"
                                                name="b1"
                                                onChange={() => {
                                                    formik.setFieldValue("b1M", true);
                                                }}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input type="radio" name="b1" disabled={true}/>
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="radio"
                                                name="b1"
                                                defaultChecked={true}
                                                onChange={() => {
                                                    formik.setFieldValue("b1M", false);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">
                                            <label>B - all cars/duel purpose</label>
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="radio"
                                                name="b"
                                                onChange={() => {
                                                    formik.setFieldValue("bM", true);
                                                    formik.setFieldValue("bA", false);
                                                }}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="radio"
                                                name="b"
                                                onChange={() => {
                                                    formik.setFieldValue("bM", false);
                                                    formik.setFieldValue("bA", true);
                                                }}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="radio"
                                                name="b"
                                                defaultChecked={true}
                                                onChange={() => {
                                                    formik.setFieldValue("bA", false);
                                                    formik.setFieldValue("bM", false);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">
                                            <label>A1 - Mortorcycle Engine Capacity &lt; 100</label>
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="radio"
                                                name="A1"
                                                onChange={() => {
                                                    formik.setFieldValue("a1M", true);
                                                    formik.setFieldValue("a1A", false);
                                                }}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="radio"
                                                name="A1"
                                                onChange={() => {
                                                    formik.setFieldValue("a1M", false);
                                                    formik.setFieldValue("a1A", true);
                                                }}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="radio"
                                                name="A1"
                                                defaultChecked={true}
                                                onChange={() => {
                                                    formik.setFieldValue("a1M", false);
                                                    formik.setFieldValue("a1A", false);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">
                                            <label>A - Mortorcycle Engine Capacity &ge; 100</label>
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="radio"
                                                name="A"
                                                onChange={() => {
                                                    formik.setFieldValue("aM", true);
                                                }}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input type="radio" name="A" disabled={true}/>
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="radio"
                                                name="A"
                                                defaultChecked={true}
                                                onChange={() => {
                                                    formik.setFieldValue("aM", false);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <Form.Text
                                    className="text-danger items-start flex justify-start text-left flex-row w-full">
                                    {errorMsg}
                                </Form.Text>
                            </div>

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

export default Medical;