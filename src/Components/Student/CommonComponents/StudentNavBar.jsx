import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { deleteNotification, getAllnotificationByID, getNotification } from '../../ApiService/api';
import Card from "react-bootstrap/Card";

const StudentNavBar = () => {
    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [interrupt, setInterrupt] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await getAllnotificationByID(sessionStorage.getItem('username'), 'STUDENT');
            if (response?.data?.code === '00') {
                const newNotifications = response.data.content;
                setNotifications(newNotifications);
            }
        };
        fetchNotifications();
    }, [interrupt]);

    const calculateReceivedTime = (notificationDate) => {
        const now = new Date();
        const notificationTime = new Date(notificationDate);
        const timeDifferenceMs = now - notificationTime;
        const hoursDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        const minutesDifference = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hoursDifference}h ${minutesDifference}m ago`;
    };

    const deleteItem = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Do you want to delete this notification?',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteNotification(id);
                setInterrupt(!interrupt);
            }
        });
    };

    const handleLogOut = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Log Out',
            showCancelButton: true,
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.clear();
                nav('/');
            }
        });
    };

    return (
        <div className="w-screen">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid className="w-screen flex flex-row justify-between">
                    <Navbar.Brand>
                        <div className="flex items-start flex-row justify-start">
                            <div className="relative inline-block" onClick={() => setShowNotification(!showNotification)}>
                                <div>
                                    <FaBell className="text-gray-600 text-3xl" />
                                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 bg-red-500 text-white rounded-full text-xs">
                                        {notifications?.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {showNotification && notifications.length > 0 && (
                            <div className="w-96 overflow-y-scroll absolute h-52 flex-row bg-gray-500 z-50">
                                {notifications.map((data, i) => (
                                    <div className="flex flex-col bg-gray-100 border" key={i}>
                                        <Card className="flex flex-col text-sm w-full h-40">
                                            <div className="flex flex-row justify-between font-semibold w-full">
                                                <div className="flex w-wrap h-wrap mb-2">
                                                    <div className="flex justify-center rounded-full items-center w-fit h-fit">
                                                        <div className="w-12 h-12 pt-1 pl-1 mt-1 ml-1 rounded-full">
                                                            <Image
                                                                src={`${data?.image}`}
                                                                style={{ width: '100%', height: '100%' }}
                                                                roundedCircle
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row pl-2 font-normal text-xs w-full">
                                                        <div className="w-72">
                                                            <div className="mt-2">
                                                                {data?.message} |{' '}
                                                                {data?.itemOrEventDate &&
                                                                    new Date(data.itemOrEventDate)
                                                                        .toISOString()
                                                                        .split('T')[0]}{' '}
                                                                at{' '}
                                                                {data?.itemOrEventDate &&
                                                                    new Date(data.itemOrEventDate).toLocaleTimeString('en-US', {
                                                                        hour12: false,
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    })}
                                                            </div>
                                                            <div className="font-normal">
                                                                {data?.itemID} - {data?.itemFname} {data?.itemLname}
                                                            </div>
                                                            <div>
                                                                <span className="text-xs text-gray-400">
                                                                    {calculateReceivedTime(data.notificationDate)} Ago
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row items-center justify-end h-full -ml-2">
                                                            <MdOutlineDeleteOutline
                                                                size={'30'}
                                                                className="bg-red-500 rounded-full p-1 text-white"
                                                                onClick={() => deleteItem(data?.notificationID)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="w-full">
                        <Nav className="me-auto my-2 my-lg-0 justify-end w-full" style={{ maxHeight: '200px' }} navbarScroll>
                            <Nav.Link href="/Student/studentSchedules">Schedules</Nav.Link>
                            <Nav.Link href="/Student/sessions">Sessions</Nav.Link>
                            <Nav.Link href="/Student/studentProfile">Profile</Nav.Link>
                            <Nav.Link onClick={handleLogOut} className="text-danger">
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default StudentNavBar;
