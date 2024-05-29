import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {deleteNotification, getNotification} from "../../ApiService/api";
import { FaBell } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const AdminHomeNavBar = () => {
    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [interrupt, setInterrupt] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await getNotification("ADMIN");
            if (response?.data?.code === "00") {
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

    const handleNotificationClose = (index) => {
        setNotifications(notifications.filter((_, i) => i !== index));
    };
    const deleteItem = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Do you want to delete this notification?',
        }).then(async (result) => {
            await deleteNotification(id);
            setInterrupt(!interrupt);
        })

    }

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid className="p-3 bg-white">
                    <Form className="d-flex gap-x-3 w-full justify-end">
                        <div className="relative">
                            <div className="flex items-end flex-row justify-end w-96">
                                <div className="relative inline-block" onClick={() => setShowNotification(!showNotification)}>
                                    <div>
                                        <FaBell className="text-gray-600 text-3xl"/>
                                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 bg-red-500 text-white rounded-full text-xs">
                                        {notifications?.length}
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="w-96 overflow-y-scroll h-44 absolute">
                                    {showNotification && notifications.length > 0 &&
                                        notifications.map((data, i) => (
                                            <div className="flex flex-col bg-white border rounded-lg" key={i}>
                                                <div className="flex flex-col text-sm w-full h-full rounded-lg">
                                                    <div className="flex flex-row justify-between font-semibold w-full">
                                                        <div className="flex w-wrap h-wrap mb-2">
                                                            <div
                                                                className="flex justify-center rounded-full items-center w-fit h-fit">
                                                                <div
                                                                    className="w-12 h-12 pt-1 pl-1 mt-1 ml-2 rounded-full">
                                                                    <Image src={`${data?.image}`}
                                                                           style={{width: '100%', height: '100%'}}
                                                                           roundedCircle/>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className='flex flex-row pl-4 font-normal text-xs w-full'>
                                                                <div className='w-72'>
                                                                    <div className='mt-2'>
                                                                        {data?.message} |{' '}
                                                                        {data?.itemOrEventDate && new Date(data.itemOrEventDate).toISOString().split('T')[0]} at{' '}
                                                                        {data?.itemOrEventDate && new Date(data.itemOrEventDate).toLocaleTimeString('en-US', {
                                                                            hour12: false,
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })}
                                                                    </div>
                                                                    <div className='font-normal'>
                                                                        {data?.itemID} - {data?.itemFname} {data?.itemLname}
                                                                    </div>
                                                                   <div>
                                                                        <span className='text-xs text-gray-400'>
                                                                            {calculateReceivedTime(data.notificationDate)} Ago
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-row items-center justify-end h-full -ml-5 '>
                                                                    <MdOutlineDeleteOutline size={'30'} className={'bg-red-500 rounded-full p-1 text-white'} onClick={()=>{deleteItem(data?.notificationID)}}/>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                        </div>
                    </Form>
                </Container>
            </Navbar>
        </div>
    );
};

export default AdminHomeNavBar;
