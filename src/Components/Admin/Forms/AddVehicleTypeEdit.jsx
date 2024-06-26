import React, {useEffect,useState} from 'react';
import Card from "react-bootstrap/Card";
import {Button, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import * as Yup from "yup";
import {UpdateVehicleTypes} from "../../ApiService/api";
import Swal from "sweetalert2";
function AddVehicleTypeEdit({data,setShowModal}) {
    console.log(data);

    const [parsedData, setParsedData] =useState(data);
    const [isVissibleAuto, setIsVisibleAuto] = useState(false);
    const [isVissibleManual, setIsVisibleManual] = useState(false);
    const formik = useFormik({
        initialValues: {
            typeID: parsedData?.typeID,
            engineCapacity: parsedData?.engineCapacity,
            typeName: parsedData?.typeName,
            typeAuto: parsedData?.typeAuto,
            typeManual: parsedData?.typeManual,

        },
        validationSchema: Yup.object({
            //typeID: Yup.string().required("Required").matches(/^[A-Z][0-9]+$/, "No spaces allowed").matches(/^[A-Z]+$/,"Capital letters allowed"),
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
    const save = async () => {
            console.log(formik.values);
        try {
            const result = await Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                showCancelButton: true,
            });
            if (result.isConfirmed) {
               const response = await UpdateVehicleTypes(formik.values);
                if(response?.data?.code==="00"){
                    Swal.fire(
                        {
                            title:"Updated!",
                            html:"Vehicle type has been Updated.",
                            icon:"success",
                        });

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
        <div className="flex items-center justify-center ">
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
                                disabled={true}
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
                                    checked={formik.getFieldProps("typeManual").value||parsedData?.typeManual}
                                    onChange={() => {
                                        formik.setFieldValue("typeManual", true);
                                        formik.setFieldValue("typeAuto", false);
                                        setIsVisibleManual(true)
                                    }}
                                    required
                                    disabled={formik.getFieldProps("typeAuto").value||isVissibleAuto||(formik.getFieldProps("typeManual").value && formik.getFieldProps("typeAuto").value)||parsedData?.typeAuto}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Auto"
                                    checked={formik.getFieldProps("typeAuto").value||parsedData?.typeAuto}
                                    name="Control"
                                    onChange={() => {
                                        formik.setFieldValue("typeAuto", true);
                                        formik.setFieldValue("typeManual", false);
                                        setIsVisibleAuto(true);
                                    }}
                                    required
                                    disabled={formik.getFieldProps("typeManual").value||isVissibleManual||(formik.getFieldProps("typeManual").value && formik.getFieldProps("typeAuto").value)||parsedData?.typeManual}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Both"

                                    Copy code
                                    checked={
                                        (formik.getFieldProps("typeAuto").value && formik.getFieldProps("typeManual").value) ||
                                        (parsedData && parsedData.typeAuto && parsedData.typeManual)
                                    }
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
                                className="flex flex-row justify-end items-center bg-neutral-100 p-2 rounded-md mt-4">
                                <Button
                                    type="submit"
                                >
                                    Save Changes
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

export default AddVehicleTypeEdit;