import React, {useEffect, useState} from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar, momentLocalizer} from "react-big-calendar";
import {Modal} from "react-bootstrap";
import ModalForAddSchedule from "./ModalForAddSchedule";
import {getAllSchedules} from "../../../ApiService/api";
import ModalForViewScheduler from "./ModalForViewScheduler";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


function ScheduleCalander(props) {

    const [eventList, setEventList] = useState([])
    const [selectedDate, setSelectedDate] = useState('')
    //hook for add new event
    const[showModalAddEvent, setShowModalAddEvent] = useState(false)
    const [interrupt, setInterrupt] = useState(false)

    //hook for preview event
    const [showModalEventDetails, setShowModalEventDetails] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState({})



    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllSchedules();
            if(response?.data?.code ==="00"){
                const data = response?.data?.content;
                const events = data.map((event) => {
                    let backgroundColor = "green";
                    return {
                        start: new Date(event.start),
                        end: new Date(event.end),
                        title:
                            (<div className="flex text-xs gap-x-2">
                                <div>
                                    {event.title}
                                </div>
                                <div>
                                    {new Date(event.start).toTimeString().split(' ')[0]} - {new Date(event.end).toTimeString().split(' ')[0]}
                                </div>
                            </div>),
                        titleFetch: event.title,
                        studentCount: event.studentCount,
                        trainerID: event.trainerID,
                        registrationNo: event.registrationNo,
                        trainerFname: event.trainerFname,
                        trainerLname: event.trainerLname,
                        contactNo: event.contactNo,
                        make: event.make,
                        model: event.modal,
                        schedulerID: event.schedulerID,
                        vehicleClass: event.vehicleClass,
                        vehicleClassName: event.vehicleClassName,
                        vehiclePhoto: event.vehiclePhoto,
                        trainerPhoto: event.trainerPhoto,
                        bookingScheduleDTO: event.bookingScheduleDTO,
                        trainerRequestToCancel: event.trainerRequestToCancel,
                        isStrated: event.isStarted,
                        isCompleted: event.isCompleted,
                        color:event.isStarted?"":event.trainerRequestToCancel?"pink":event.studentCount === event.bookingScheduleDTO?.length ? "red" : event.bookingScheduleDTO?.length !==0? "#BE8400" :"green",
                    }
                })
                setEventList(events);
            }
        }
        fetchData();
    }, [interrupt]);


    return (
        <div style={{width:1300}} className='flex items-center justify-center  w-screen h-full mt-10'>
            <Calendar
                localizer={localizer}
                events={eventList}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event => {setSelectedEvent(event);setShowModalEventDetails(true)}}
                onSelectSlot={(e) => {setSelectedDate(new Date(e.start));setShowModalAddEvent(true)}}
                eventPropGetter={event => {
                    const backgroundColor = event.color;
                    return { style: { backgroundColor } };
                }}
                selectable
                style={{ height: 800 }}
            />
            <Modal show={showModalAddEvent} onHide={()=>{setShowModalAddEvent(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalForAddSchedule setEventList={setEventList} selectedDate={selectedDate} eventList={eventList} interrupt={interrupt} setInterrupt={setInterrupt}/>
                </Modal.Body>
            </Modal>
            <Modal show={showModalEventDetails} onHide={()=>{setShowModalEventDetails(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Event Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalForViewScheduler eventDetails={selectedEvent} interrupt={interrupt} setInterrupt={setInterrupt}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ScheduleCalander;