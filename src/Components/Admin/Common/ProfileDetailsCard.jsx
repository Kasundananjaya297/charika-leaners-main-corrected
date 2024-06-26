import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button, ModalHeader} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import { FaUserEdit } from "react-icons/fa";
import { Modal } from 'react-bootstrap';
import {SelectPackage} from "../Forms/SelectPackage";
import {returnFocus} from "react-modal/lib/helpers/focusManager";
import PackageCard from "./PackageCard";
import {getAgreement} from "../../ApiService/api";
import SessionCard from "./SessionCard";
import PackageCardForSelected from "./PackageCardForSelected";
import Payment from "./Payment";
import PaymentHistory from "./PaymentHistory";
export default function ProfileDetailsCard({ studentData,setInterrupt,interrupt }) {
  const [showModal, setShowModal] = useState(false);
  const [packModal, setPackModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [packData,setPackData] = useState([]);
  const[showModalSession,setShowModalSession] = useState(false);
  const [showModalCollectPayment, setShowModalCollectPayment] = useState(false);
  const [showModalPaymentHistory,setShowModalPaymentHistory] = useState(false);
  const nav = useNavigate();
  const showPackModal = () => {
    setPackModal(true);
  };

  // Function to hide the modal
  const hidePackModal = () => {
    setPackModal(false);
  };
const viewMedical = (stdID) =>{
  if (stdID !== null && stdID !== undefined && stdID !== ""){
    nav("/studentprofile/medical/view",{state:stdID});
  }
  
}
  const AddTrial = (stdID) => {
    if (stdID !== null && stdID !== undefined && stdID !== "") {
      nav("/studentprofile/trail", { state: stdID });
    }
  };
const viewTrail = (stdID) =>{
  if (stdID !== null && stdID !== undefined && stdID !== "") {
  nav("/studentprofile/trailView", { state: stdID });
}}
  const AddMedical = (stdID) => {
  if (stdID !== null && stdID !== undefined && stdID !== "") {
        nav("/studentprofile/medical", { state: stdID });
        }
  }
  const regForm2 = (studentData) => {
    console.log("clicked");
    nav("/studentprofile/Form1/edit", { state: studentData });
  }

  useEffect(() => {
    const fetchData = async () => {
        const response = await getAgreement(studentData?.stdID);
        setPackData(response?.data?.content);
    }
    fetchData();
  }, [showModal1,showModal,interrupt,showModalCollectPayment]);
  return (
    <div>
      <Row className="flex overflow-hidden text-sm item-center">
        <Col sm={12} md={6} lg={4}>
          <Card style={{ width: "24rem" }}>
          <div className="flex  justify-between pr-1 pl-5 pt-3 w-wrap h-wrap -mb-6 " >
            <FaUserEdit size={24} onClick={() => regForm2(studentData)}/>
            <Col xs={1} sm={3}>
              <div className="flex justify-center rounded-full items-center  w-fit h-fit bg-gray-200">
                <div className=" w-16 h-16 p-2 rounded-full">
                    <Image src={`${studentData?.profilePhotoURL}`} style={{ width: '100%', height: '100%' }} roundedCircle onClick={()=>setShowModal(true)}/>
                </div>
              </div>
            </Col>
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Body className="text-center">
                  <Image src={`${studentData?.profilePhotoURL}`} style={{ maxWidth: '100%', maxHeight: '80vh' }} rounded />
              </Modal.Body>
          </Modal>
            <Card.Body className="p-4">
              <Row className="mb-2">
                <Col xs={4}>Contract No:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.stdID}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>Name:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.fname} {studentData?.lname}
                </Col>
              </Row>
              <Row className="mb-2 flex items-center justify-center">
                <Col xs={4}>Medical:</Col>
                <Col xs={8} className="pl-4 font-bold flex flex-row gap-x-4 items-center">
                  <Button
                      className="flex w-18 h-8 justify-center items-center"
                      variant="outline-success"
                      style={{ fontSize: "small" }}
                      onClick={()=>{AddMedical(studentData?.stdID)}}
                  >
                    Add
                  </Button>
                  <Button variant="link" className="font-bold" style={{ fontSize: "small" }} onClick={()=>viewMedical(studentData?.stdID)}>View</Button>
                </Col>
              </Row>
              <Row className="mb-2 flex items-center justify-center">
                <Col xs={4}>Trail:</Col>
                <Col xs={8} className="font-bold flex flex-row gap-x-4 items-center" >
                  <Button
                    className="flex w-18 h-8 justify-center items-center "
                    variant="outline-success"
                    onClick={(e) => {
                      AddTrial(studentData?.stdID);
                    }}
                    style={{ fontSize: "small" }}
                  >
                    Add
                  </Button>
                  <Button variant="link" className="font-bold" style={{ fontSize: "small" }}
                          onClick={(e) => {
                            viewTrail(studentData?.stdID);
                          }}>View</Button>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>Address:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.addressNo} {studentData?.adl1},{" "}
                  {studentData?.adl2}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>City:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.city}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>Contact:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.telephone}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>Email:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.email}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>NIC:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.nic}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>Age:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.age}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>Gender:</Col>
                <Col xs={8} className="pl-4">
                  {(studentData?.isMale?"Male":"Female")}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>Guardian's N:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.guardianName}
                </Col>
              </Row>
              <Row className="mb-2 flex items-center justify-center">
                <Col xs={4}>Guardian's C:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.guardianTelephone}
                </Col>
              </Row>
              <Row className="mb-2 flex items-center justify-center">
                <Col xs={4}>Registered on:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.registered}
                </Col>
              </Row>
              <Row className="mb-2 items-center">
                <Col xs={4}>Account State:</Col>
                <Col xs={6} className="pl-4">
                  <Button
                    size="sm"
                    variant={
                      studentData?.registrationStatus === false
                        ? "danger"
                        : "success"
                    }
                    disabled
                  >
                    {studentData.registrationStatus === false
                      ? "Not-Activated"
                      : "Activated"}
                  </Button>
                </Col>
              </Row>
              <Row className="mb-2 items-center">
                <Col xs={4}>Package:</Col>
                <Col xs={8} className="font-bold flex flex-row gap-x-4 items-center" >
                    <Button
                      className="flex w-18 h-8 justify-center items-center "
                      variant="outline-success"
                      onClick={() => {
                        setPackModal(true)
                      }}
                      style={{ fontSize: "small" }}
                    >
                      Add
                    </Button>
                  <Button variant="link" className="font-bold" style={{ fontSize: "small" }} onClick={()=>{setShowModal1(true);setInterrupt(!interrupt)}}>View</Button>
                  <Modal show={packModal} onHide={()=>{setPackModal(false);setInterrupt(!interrupt)}} centered size='xl'>
                    <Modal.Header closeButton>
                      <Modal.Title>Select Package</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="overflow-hidden">
                      <SelectPackage stdID = {studentData?.stdID} sethidePackModal = {setPackModal} setInterrupt = {setInterrupt} interrupt={interrupt}/>
                    </Modal.Body>
                  </Modal>
                  <Modal show={showModal1} onHide={()=>{setShowModal1(false);setInterrupt(!interrupt)}} >
                    <Modal.Header closeButton>
                      <Modal.Title>Selected Package</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="items-center flex flex-row justify-center">
                        {packData?.map((data, i) => (
                            <PackageCardForSelected key={i} packeData={data} />
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
              <Row className="mb-2 items-center">
                <Col xs={4}>Sessions:</Col>
                <Col xs={8} className="pl-4 font-bold">
                  <Button style={{ fontSize: "small" }}
                          className="flex w-18 h-8 justify-center items-center"
                          variant="outline-success"
                          onClick={()=>{setShowModalSession(true)}}>View & Edit</Button>
                </Col>
              </Row>
              <div></div>
              <Modal show={showModalSession} onHide={()=>{setShowModalSession(false);setInterrupt(!interrupt)}}  size={'xl'}>
                  <ModalHeader closeButton>
                    <Modal.Title>Session Details</Modal.Title>
                  </ModalHeader>
                    <Modal.Body className="items-center flex flex-row justify-center w-full">
                      {packData?.map((data, i) => (
                          <SessionCard key={i} packeData={data} stdID ={studentData?.stdID} setInterrupt={setInterrupt}/>
                      ))}
                    </Modal.Body>
              </Modal>
              <Row className="mb-2">
                <Col xs={4}>Full-Payment:</Col>
                <Col xs={8} className="pl-4 font-bold">
                  Rs. {studentData?.fullPayment}
                </Col>
              </Row>
              <Row className="mb-2 items-center">
                <Col xs={4}>Payments:</Col>
                <Col xs={8} className="font-bold flex flex-row gap-x-4 items-center">
                  <Button
                      className="flex w-18 h-8 justify-center items-center "
                      variant="outline-success"
                      onClick={() => {
                        setShowModalCollectPayment(true);
                      }}
                      style={{ fontSize: "small" }}
                  >
                    Collect
                  </Button>
                  <Modal  show ={showModalCollectPayment} onHide={()=> {
                    setShowModalCollectPayment(false);
                    setInterrupt(!interrupt)
                  }}>
                    <Modal.Header closeButton>
                      <Modal.Title>Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='flex items-center justify-center'>
                      <div>
                        <Payment data={studentData} packageData={packData} setShowModal={setShowModalCollectPayment}/>
                      </div>
                    </Modal.Body>
                  </Modal>
                  <Button variant="link" className="font-bold" style={{ fontSize: "small" }} onClick={()=>setShowModalPaymentHistory(true)}>View</Button>
                </Col>
              </Row>
              <Modal show={showModalPaymentHistory} onHide={()=>setShowModalPaymentHistory(!showModalPaymentHistory)} size={'lg'}>
                <Modal.Header closeButton>
                  <Modal.Title>Payment History</Modal.Title>
                </Modal.Header>
                <Modal.Body className='items-center justify-center flex'>
                  <PaymentHistory data={studentData} packageData={packData} setShowModal={setShowModalPaymentHistory}/>
                </Modal.Body>
              </Modal>
              <Row className="mb-2">
                <Col xs={4}>Remain:</Col>
                <Col xs={8} className="pl-4 font-bold">
                  Rs. {studentData?.balance}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
