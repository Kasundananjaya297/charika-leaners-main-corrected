import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment/moment";
import {getSchedulesforStudent} from "../ApiService/api";
import {Modal} from "react-bootstrap";
import ModalForViewScheduler from "./SchedulesForStudent/ModalForViewScheduler";


const localizer = momentLocalizer(moment);

    const StudentSchedules = () => {
    const [eventList, setEventList] = React.useState([]);

    const [showModalEventDetails, setShowModalEventDetails] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState({});
    const [interrupt, setInterrupt] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const response = await getSchedulesforStudent(sessionStorage.getItem('username'));
            const data = response?.data?.content;
            const events = data.map((event) => {
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
                    color:sessionStorage.getItem('username') === event.bookingScheduleDTO[0]?.stdID ? "#BE8400" : "green",

                }
            })
            setEventList(events);
        };
        fetch();
    }, []);
    console.log(eventList?.bookingScheduleDTO);
    return (
        <div className='flex flex-col items-center justify-center w-full p-4 -mt-4 h-screen overflow-hidden'>
            <div className='w-full lg:w-3/4 xl:w-2/3' style={{height: '90%'}}>
                <Calendar
                    localizer={localizer}
                    events={eventList}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={event => {setSelectedEvent(event);setShowModalEventDetails(true)}}
                    // onSelectSlot={(e) => {setSelectedDate(new Date(e.start));setShowModalAddEvent(true)}}
                    eventPropGetter={event => {
                        const backgroundColor = event.color;
                        return {style: {backgroundColor}};
                    }}
                    selectable
                    style={{height: '100%'}}
                />
            </div>
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
};

export default StudentSchedules;