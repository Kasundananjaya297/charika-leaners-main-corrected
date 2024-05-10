import React, {useEffect} from 'react';
import Card from "react-bootstrap/Card";
import {Button, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import * as Yup from "yup";
import {saveVehicleType,uploadFile} from "../../ApiService/api";
import {useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function AddVehicleType({setShowModal}) {
    const formik = useFormik({
        initialValues: {
            typeID: "",
            engineCapacity: "",
            typeName: "",
            isHeavy:"",
        },
        validationSchema: Yup.object({
            typeID: Yup.string()
                .required("Required")
                .matches(/^[A-Z]{1,3}[1-9]*$/, { message: "Capital letters allowed, Sapce Not allowed and maximum length is 3" }),

            engineCapacity: Yup.string().matches(/^[0-9<>= CcKg]+$/, "Must be a number,or CC/Kg a number with >,<,.."),
            typeName: Yup.string().required("Required").matches(/^[a-zA-Z ]+$/, "Must be a string"),
            isHeavy:Yup.boolean().required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                await save();
            } catch (error) {
                console.error("Error occurred while saving:", error);
            }
        },
    });

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
                    setShowModal(false);
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
    return (
        <div className="flex items-center justify-center">
            <Card style={{ width: '40rem' }}>
            <Card.Body>
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
                                Engine Capacity/Weight:<span className="text-red-500"></span>
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
                                Class Of Vehicle:<span className="text-red-500"> *</span>
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
                    </Row>
                    <Row className='mt-3'>
                        <Form.Group as={Col} md={6} className="mb-3">
                            <Form.Label>
                                Heavy Vehicle:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <div className='flex-row flex gap-x-4 pl-4 small'>
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="isHeavy"
                                    size='sm'
                                    onChange={() => {
                                        formik.setFieldValue("isHeavy", true);
                                    }}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="isHeavy"
                                    size='sm'
                                    onChange={() => {
                                        formik.setFieldValue("isHeavy", false);
                                    }}
                                    required
                                />
                            </div>
                        </Form.Group>
                    </Row>
                    <Form.Group>
                        <Row>
                            <div
                                className="flex flex-row justify-end items-center bg-neutral-100 p-2 rounded-md mt-4">
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