import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "react-icons-kit";
import { IoScanCircleOutline } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import { Scanner } from "@yudiel/react-qr-scanner";
import {changePassword} from "../../ApiService/api";
import Swal from "sweetalert2";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);
    const [showModalQrScanner, setShowModalQrScanner] = useState(false);
    const [scanTarget, setScanTarget] = useState(null);
    const nav = useNavigate();

    const handleToggle = () => {
        setType((prevType) => (prevType === "password" ? "text" : "password"));
        setIcon((prevIcon) => (prevIcon === eyeOff ? eye : eyeOff));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        try {
            const data = { username:sessionStorage.getItem("username"), password:currentPassword, newPassword:newPassword, role:sessionStorage.getItem("role"), isActive:true }
            const response = await changePassword(data);
            if (response.data.code === "00") {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Password changed successfully",
                }).then(() => {
                    nav("/");
                });
            }else if(response.data.code === "10"){
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Invalid Current Password",
                })
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleScanSuccess = (text) => {
        if (scanTarget === "current") {
            setCurrentPassword(text);
        } else if (scanTarget === "new") {
            setNewPassword(text);
            setConfirmPassword(text);
        }
        setShowModalQrScanner(false);
    };

    return (
        <div className="flex justify-center items-center">
            <ToastContainer />
            <Card style={{ width: "25rem" }}>
                <Card.Body>
                    <Card.Title>
                        <p className="flex flex-row justify-center p-4 rounded-md text-2xl">
                            Change Password
                        </p>
                    </Card.Title>
                    <div className="pl-8 pr-8">
                        <Form onSubmit={handleChangePassword}>
                            <Form.Group className="mb-3 flex flex-col w-full relative">
                                <Form.Label>Current Password:</Form.Label>
                                <div className="flex flex-row w-full relative">
                                    <Form.Control
                                        type={type}
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                    <div className="absolute top-0 right-0 flex flex-row items-center justify-center gap-x-2 h-full mr-3">
                                        <IoScanCircleOutline
                                            size={25}
                                            onClick={() => {
                                                setScanTarget("current");
                                                setShowModalQrScanner(true);
                                            }}
                                        />
                                        <span onClick={handleToggle}>
                      <Icon icon={icon} size={25} />
                    </span>
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3 flex flex-col w-full relative">
                                <Form.Label>New Password:</Form.Label>
                                <div className="flex flex-row w-full relative">
                                    <Form.Control
                                        type={"password"}
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3 flex flex-col w-full relative">
                                <Form.Label>Confirm New Password:</Form.Label>
                                <div className="flex flex-row w-full relative">
                                    <Form.Control
                                        type={"password"}
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-full mt-3 mb-4">
                                Change Password
                            </Button>
                        </Form>
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
                    <Scanner onResult={handleScanSuccess} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ChangePassword;
