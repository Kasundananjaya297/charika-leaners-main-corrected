import React,{useEffect,useState} from 'react'
import { useFormik } from 'formik'
import {Card, Form, Row, Col, Button, Dropdown} from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import { getVehicleType } from '../../ApiService/api';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
export default function AddPackages() {
    const [vehicleType, setVehicleType] = useState([]);
    const [ID, setID] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [autoOrManual, setAutoOrManual] = useState("");
    const [isVisible, setIsVisible] = useState(false);

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
  return (
    <div className="flex flex-row justify-center items-center w-screen h-screen" >
        <Card style={{ width: "40em" }}>
            <Card.Body className="overflow-auto h-full">
                <div className='p-4'>
                <Form onSubmit={""}>
                <Row>
                    <div className="flex justify-center p-2 bg-neutral-100 rounded-md text-2xl mb-3">
                         Add Package Details
                    </div>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3"> 
                            <Form.Label>
                                Package Name:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                // {...formik.getFieldProps("serialNo")}
                                type="Number"
                                placeholder=""
                                required
                            />
                            <Form.Text className="text-danger">
                                {/* {formik.touched.serialNo && formik.errors.serialNo} */}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                            <Form.Label>
                                Decpription:<span className="text-red-500"> *</span>
                            </Form.Label>
                            <Form.Control
                                // {...formik.getFieldProps("serialNo")}
                                type="Number"
                                placeholder=""
                                required
                            />
                            <Form.Text className="text-danger">
                                {/* {formik.touched.serialNo && formik.errors.serialNo} */}
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
                                type="text"
                                placeholder="First Name"
                                // {...formik.getFieldProps("fname")}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="mt-4">
                    Add Lessons<span className="text-red-500"> *</span>
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
                            <Form.Group controlId={`dropdown-${i}`} required>
                                  <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                                      Type
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      {item?.typeAuto && (
                                        <Dropdown.Item
                                        //{...formik.getFieldProps("vehicleType")}
                                          onClick={() => {
                                            setSelectedType(item?.typeID);
                                            setAutoOrManual("Auto");
                                            setID(i);
                                            setIsVisible(true);
                                            //formik.setFieldValue("vehicleType", "Auto");
                                          }}
                                        >
                                          Auto
                                        </Dropdown.Item>
                                      )}
                                      {item?.typeManual && (
                                        <Dropdown.Item
                                        //{...formik.getFieldProps("vehicleType")}
                                          onClick={() => {
                                            setSelectedType(item?.typeID);
                                            setAutoOrManual("Manual");
                                            setID(i);
                                            setIsVisible(true);
                                            //formik.setFieldValue("vehicleType", "Manual");
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
                                <Col md={4}>
                                <Form.Control
                                    type="number"
                                    min={0}
                                    max={50}
                                    placeholder="0"
                                    // {...formik.getFieldProps("fname")}
                                    required
                                /></Col>
                            </td>
                          </tr>
                      ))
                    }
                    </table>
                </Row>
                <Row className="pl-4 pr-4">
                  <Button onClick={AddType}>
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
