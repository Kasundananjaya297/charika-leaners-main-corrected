import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classNames from "classnames";
import {HiOutlineLogout} from "react-icons/hi";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const StudentNavBar = () => {
    const nav = useNavigate();
    const handleLogOut = () => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "Log Out",
            showCancelButton: true,
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Cancel",
            cancelButtonAriaLabel: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.clear();
                nav("/");
            }
        });
    };


    return (
        <div className='w-screen'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid className='w-screen flex flex-row justify-between'>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className='w-full'>
                        <Nav
                            className="me-auto my-2 my-lg-0 justify-end w-full"
                            style={{ maxHeight: '170px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/Student/studentHome">Home</Nav.Link>
                            <Nav.Link href="/Student/studentSchedules">Schedules</Nav.Link>
                            <Nav.Link href="#action3">Feed Backs</Nav.Link>
                            <Nav.Link href="#action3">Profile</Nav.Link>

                                <div
                                    className={classNames( "flex items-center gap-2 -ml-4 font-light px-3 py-2 no-underline hover:no-underline","text-red-500", "cursor-pointer")}
                                    onClick={handleLogOut}
                                >
                                 <span className="text-xl">
                                    <HiOutlineLogout/>
                                     </span>
                                    Logout
                                </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </div>
    );
};

export default StudentNavBar;