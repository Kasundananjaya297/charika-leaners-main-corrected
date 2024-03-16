import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useFormik } from "formik";
import { SaveStudent } from "../../ApiService/api";
import Swal from "sweetalert2";
import {
  validateName,
  validateEmail,
  validateTelephone,
  validateNIC,
  ValidateNonRequiredName,
} from "../../Validation/validation";
import * as Yup from "yup";
export default function RegistrationForm1() {
  const nav = useNavigate();
  const back = () => {
    nav("/studentprofile");
  };
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 17);
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 80);
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      telephone: "",
      nic: "",
      dateOfBirth: "",
      registered: "",
      isMale: true,
      registrationStatus: false,
      guardianName: "",
      guardianTelephone: "",
      addressNo: "",
      adl1: "",
      adl2: "",
      city: "",
    },

    validationSchema: Yup.object({
      fname: validateName("First name"),
      lname: validateName("Last name"),
      email: validateEmail(),
      telephone: validateTelephone(),
      nic: validateNIC(),
      dateOfBirth: Yup.date().required("Date of Birth Required"),
      isMale: Yup.boolean().required("Gender is Required"),
      guardianName: validateName("Guardian Name"),
      guardianTelephone: validateTelephone(),
      registered: Yup.date().required("Registered date required"),
      addressNo: Yup.string().notRequired().max(10, "max 10 characters"),
      adl1: validateName("Address line 1"),
      adl2: ValidateNonRequiredName(),
      city: validateName("City"),
    }),
    onSubmit: async (e, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        save();
        // Reset the form after successful submission
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
          const response = await SaveStudent(formik.values); // call api.saveStudent
          console.log(response);
          // Check the response and handle it accordingly
          if (response.data.code === "00") {
            Swal.fire({
              icon: "success",
              title: "Saved Successfully",
              html: `Student ID: ${response.data.content.stdID}<br>Name: ${response.data.content.fname}<br>NIC: ${response.data.content.nic}`,
            });
          } else if (response.data.code === "06") {
            Swal.fire({
              icon: "error",
              title: "Already Registered",
              html: `Student ID: ${response.data.content.stdID}<br>Name: ${response.data.content.fname}<br>NIC: ${response.data.content.nic}`,
            });
          }
        } catch (error) {
          console.error("Error while saving student details:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "NIC, telephone, and email are duplicated separately.",
          });
        }
      }
    });
  };

  useEffect(() => {
    let role = sessionStorage.getItem("role");
    console.log("role: " + role);
    if (!(role === "ADMIN" && sessionStorage.getItem("token") !== null)) {
      nav("/");
    }
  }, [nav]);
  return (
    <div className="flex flex-1 justify-center items-center w-screen mt-4 h-screen">
      <Card style={{ width: "40em" }}>
        <Card.Body>
          <div className="p-4">
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <div className="flex justify-center p-2 bg-neutral-100 rounded-md text-2xl mb-3">
                  Student Details
                </div>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  onSubmit={formik.handleSubmit}
                  method="POST"
                >
                  <Form.Label>
                    First Name<span className="text-red-500"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    {...formik.getFieldProps("fname")}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.fname && formik.errors.fname}
                  </Form.Text>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    Last Name<span className="text-red-500"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    {...formik.getFieldProps("lname")}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.lname && formik.errors.lname}
                  </Form.Text>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    Email<span className="text-red-500"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="example@ex.com"
                    {...formik.getFieldProps("email")}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.email && formik.errors.email}
                  </Form.Text>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    Telephone<span className="text-red-500"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="077xxxxxxx"
                    {...formik.getFieldProps("telephone")}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.telephone && formik.errors.telephone}
                  </Form.Text>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    NIC<span className="text-red-500"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="200xxxxxxx"
                    {...formik.getFieldProps("nic")}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.nic && formik.errors.nic}
                  </Form.Text>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    Date Of Birth<span className="text-red-500"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Last tName"
                    max={maxDate.toISOString().split("T")[0]}
                    min={minDate.toISOString().split("T")[0]}
                    {...formik.getFieldProps("dateOfBirth")}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                  </Form.Text>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    Gender<span className="text-red-500"> *</span>
                  </Form.Label>
                  <div className="flex flex-row gap-x-4 pl-4">
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      onChange={() => formik.setFieldValue("isMale", true)}
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      onChange={() => formik.setFieldValue("isMale", false)}
                      required
                    />
                  </div>
                  <Form.Text className="text-danger">
                    {formik.touched.isMale && formik.errors.isMale}
                  </Form.Text>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    Registered On<span className="text-red-500"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    {...formik.getFieldProps("registered")}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.registered && formik.errors.registered}
                  </Form.Text>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Address No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address Number"
                    {...formik.getFieldProps("addressNo")}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.addressNo && formik.errors.addressNo}
                  </Form.Text>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    Address Line 1
                    <span className="text-red-500" required>
                      {" "}
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address Line 1"
                    {...formik.getFieldProps("adl1")}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.adl1 && formik.errors.adl1}
                  </Form.Text>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address Line 2"
                    {...formik.getFieldProps("adl2")}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.adl2 && formik.errors.adl2}
                  </Form.Text>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    City
                    <span className="text-red-500"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    {...formik.getFieldProps("city")}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.city && formik.errors.city}
                  </Form.Text>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    Guardian Name
                    <span className="text-red-500"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    required
                    {...formik.getFieldProps("guardianName")}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.guardianName && formik.errors.guardianName}
                  </Form.Text>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>
                    Guardian Tel<span className="text-red-500"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="077xxxxxxx"
                    {...formik.getFieldProps("guardianTelephone")}
                    required
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.guardianTelephone &&
                      formik.errors.guardianTelephone}
                  </Form.Text>
                </Form.Group>
              </Row>
              <Row>
                <div className="flex flex-row justify-between items-center bg-neutral-100 p-3 rounded-md">
                  <Button variant="danger" onClick={back}>
                    Back
                  </Button>
                  <Button type="submit" variant="success">
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
