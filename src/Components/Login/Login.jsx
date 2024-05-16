import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { ValidateUser } from "../ApiService/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "react-icons-kit";
import { IoScanCircleOutline } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [showModalQrScanner, setShowModalQrScanner] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [scanSuccess, setScanSuccess] = useState(false);

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) => (prevIcon === eyeOff ? eye : eyeOff));
  };

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, password };
      console.log(userData);
      const response = await ValidateUser(userData);
      console.log(response.data.code);
      if (response.data.code === "10") {
        toast.error("Invalid User", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);
      if (sessionStorage.getItem("role") === "ADMIN") {
        nav("/Home");
      } else if (sessionStorage.getItem("role") === "STUDENT") {
        nav("/Student/studentHome");
        sessionStorage.setItem("username", username);
      }else if (sessionStorage.getItem("role") === "TRAINER") {
        nav("/trainer/trainerHome");
        sessionStorage.setItem("username", username);
      }
    } catch (e) {
      console.error(e);
    }
  };


  const handleScanSuccess = (text) => {
    setPassword(text);
    setScanSuccess(true);
    setShowModalQrScanner(false);
  };

  return (
      <div className="flex justify-center items-center w-screen h-screen">
        <ToastContainer />
        <Card style={{ width: "25rem" }}>
          <Card.Body>
            <Card.Title>
              <p className="flex flex-row justify-center p-4 rounded-md text-2xl">
                Login
              </p>
            </Card.Title>
            <div className="pl-8 pr-8">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                      type="Text"
                      placeholder="Username..."
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                  />
                </Form.Group>
                <Form.Group className="mb-3 flex flex-col w-full relative">
                  <Form.Label>Password:</Form.Label>
                  <div className="flex flex-row w-full relative">
                    <Form.Control
                        type={type}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <div className="absolute top-0 right-0 flex flex-row items-center justify-center gap-x-2 h-full mr-3">
                    <span>
                      <IoScanCircleOutline
                          size={25}
                          onClick={() => setShowModalQrScanner(true)}
                      />
                    </span>
                      <span onClick={handleToggle}>
                      <Icon icon={icon} size={25} />
                    </span>
                    </div>
                  </div>
                </Form.Group>
              </Form>
              <Button
                  variant="primary"
                  className="w-full mt-3 mb-4"
                  onClick={HandleLogin}
              >
                Login
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Modal
            show={showModalQrScanner}
            onHide={() => setShowModalQrScanner(false)}
        >
          <Modal.Header closeButton className="flex items-center justify-center flex-row">
            <Modal.Title>QR Scanner</Modal.Title>
          </Modal.Header>
          <Modal.Body className="flex flex-row items-center justify-center">
            {scanSuccess ? null : (
                <Scanner onResult={handleScanSuccess} />
            )}
          </Modal.Body>
        </Modal>
      </div>
  );
}
