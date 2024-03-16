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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
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
      }
    } catch (e) {
      console.error(e);
    }
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
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Userame..."
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 flex">
                <Form.Control
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <span
                  class="flex justify-around items-center"
                  onClick={handleToggle}
                >
                  <Icon class="absolute mr-10" icon={icon} size={25} />
                </span>
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
    </div>
  );
}
