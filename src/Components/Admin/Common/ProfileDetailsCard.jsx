import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
export default function ProfileDetailsCard({ studentData }) {
  const [stdData,setStudentData]= useState();
  const [trailData,setTrialData] = useState();

  const nav = useNavigate();


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

  return (
    <div>
      <Row className="flex overflow-hidden text-sm item-center">
        <Col sm={12} md={6} lg={4}>
          <Card style={{ width: "24rem" }}>
            <Card.Body className="p-4">
              <Row className="mb-2 items-end flex flex-row justify-end">
                <Col xs={6} md={4}>
                  {/* Check and correct the image path */}
                  <Image src="./photo.jpg" roundedCircle fluid />
                </Col>
              </Row>
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
                  <Button variant="link" className="font-bold" style={{ fontSize: "small" }} >View</Button>
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
              <Row className="mb-2">
                <Col xs={4}>Package:</Col>
                <Col xs={8} className="pl-4 font-bold">
                  {studentData?.pak}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>Payments:</Col>
                <Col xs={8} className="pl-4 font-bold">
                  <Link to={""}>View</Link>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>Full-Payment:</Col>
                <Col xs={8} className="pl-4">
                  {studentData?.fullPayment}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4}>Remain:</Col>
                <Col xs={8} className="pl-4 font-bold">
                  {studentData?.balance}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
// addressNo: "325A2";
// adl1: "Boralugoda";
// adl2: "Athurugiriya";
// age: 0;
// balance: null;
// city: "Colombo";
// email: "Kasun.dananjaya297@gmail.com";
// fname: "Kasun";
// fullPayment: null;
// guardianName: "R.A.S";
// guardianTelephone: 771701288;
// isMale: true;
// lname: "Dhananjaya";
// nic: "2001172021";
// pack: null;
// registered: "2020-12-13";
// registrationStatus: false;
// stdID: "CN-5001";
// telephone: 771701289;
