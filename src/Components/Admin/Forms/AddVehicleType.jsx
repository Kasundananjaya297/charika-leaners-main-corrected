import React, {useEffect} from 'react';
import Card from "react-bootstrap/Card";
import {Button, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import * as Yup from "yup";
import {saveVehicleType} from "../../ApiService/api";
import {useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function AddVehicleType(props) {
    const location = useLocation();
    const stdId = location.state;
    const formik = useFormik({
        initialValues: {
            typeID: "",
            engineCapacity: "",
            typeName: "",
            typeAuto: false,
            typeManual: false,
        },
        validationSchema: Yup.object({
            typeID: Yup.string().required("Required"),
            engineCapacity: Yup.string().matches(/^[0-9<>= ]+$/, "Must be a number or a number with >,<,.."),
            typeName: Yup.string().required("Required").matches(/^[a-zA-Z ]+$/, "Must be a string"),
        }),
        onSubmit: async (values) => {
            try {
                await save();
            } catch (error) {
                console.error("Error occurred while saving:", error);
            }
        },
    });
    const nav = useNavigate();
    const back = () => {
        console.log(stdId);
        //nav("/studentprofile/trail",{ state: stdId });
        nav(-1);
    }
    const save = async () => {
        try {
            const result = await Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                showCancelButton: true,
            });
            if (result.isConfirmed) {
                const response = await saveVehicleType(formik.values);
                if(response?.data?.code==="00"){
                    Swal.fire(
                        {
                            title:"Saved!",
                            html:"Vehicle type has been saved.",
                            icon:"success",
                        });
                    //nav("/studentprofile/trail",{ state: stdId });
                    nav(-1);

                }else if(response?.data?.code==="06"){
                    Swal.fire({
                        title:"Failed!",
                        html:"Vehicle type already exists.",
                        icon:"error"
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                title:"Failed!",
                icon:"error"
            });
        }
    };
    useEffect(() => {
        let role = sessionStorage.getItem("role");
        console.log("role: " + role);
        if (!(role === "ADMIN" && sessionStorage.getItem("token") !== null)) {
            nav("/");
        } else if (stdId === null) {
            nav("/studentprofile");
        }
    }, [nav]);
    return (
        <div className="flex items-center justify-center h-screen">
            <Card style={{ width: '40rem' }}>
            <Card.Body>
                <div className="p-4">
                    <Row>
                        <div className="flex justify-center p-2 bg-neutral-100 mt-3 rounded-md text-2xl ">
                            Add new vehicle type
                        </div>
                    </Row>
                </div>
                <Form className="p-4" onSubmit={formik.handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md={6} className="mb-3">
                            <Form.Label>
                                Type ID:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="A1..."
                                {...formik.getFieldProps("typeID")}
                                required
                            />
                            <Form.Text className="text-danger">
                                {formik.touched.typeID && formik.errors.typeID}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md={6} className="mb-3">
                            <Form.Label>
                                Engine Capacity:<span className="text-red-500"></span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="100cc..."
                                {...formik.getFieldProps("engineCapacity")}
                            />
                            <Form.Text className="text-danger">
                                {formik.touched.engineCapacity && formik.errors.engineCapacity}
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <Row className="">
                        <Form.Group as={Col} md={6}>
                            <Form.Label>
                                Description:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Engine...."
                                required
                                {...formik.getFieldProps("typeName")}
                            />
                            <Form.Text className="text-danger">
                                {formik.touched.typeName && formik.errors.typeName}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                            <Form.Label>
                                Control:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <div className="flex flex-row gap-x-4 pl-2 text-sm">
                                <Form.Check
                                    type="radio"
                                    label="Manual"
                                    name="Control"
                                    onChange={() => {
                                        formik.setFieldValue("typeManual", true);
                                        formik.setFieldValue("typeAuto", false);
                                    }}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    label="Auto"
                                    name="Control"
                                    onChange={() => {
                                        formik.setFieldValue("typeAuto", true);
                                        formik.setFieldValue("typeManual", false);
                                    }}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    label="Both"
                                    name="Control"
                                    onChange={() => {
                                        formik.setFieldValue("typeAuto", true);
                                        formik.setFieldValue("typeManual", true);
                                    }}
                                    required
                                />
                            </div>
                        </Form.Group>
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

            </Card.Body>
            </Card>
        </div>
    );
}

export default AddVehicleType;