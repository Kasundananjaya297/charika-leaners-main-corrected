import React, {useState} from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar, momentLocalizer} from "react-big-calendar";
import {Modal} from "react-bootstrap";
import ModalForAddSchedule from "./ModalForAddSchedule";

const localizer = momentLocalizer(moment);

// // Define your events list
// const myEventsList = [
//     {
//         title: 'Event 1',
//         start: new Date(2024, 3, 1), // Month is 0-indexed (April)
//         end: new Date(2024, 3, 2), // Month is 0-indexed (April)
//     },
//     {
//         title: 'Event 2',
//         start: new Date(2024, 3, 5), // Month is 0-indexed (April)
//         end: new Date(2024, 3, 6), // Month is 0-indexed (April)
//     },
//     // Add more events as needed
// ];
function ScheduleCalander(props) {

    const [eventList, setEventList] = useState([])
    //hook for add new event
    const[showModalAddEvent, setShowModalAddEvent] = useState(false)
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={eventList}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event => {console.log("clicked event", event)}}
                onSelectSlot={() => {setShowModalAddEvent(true)}}
                selectable
                style={{ height: 800 }}
            />
            <Modal show={showModalAddEvent} onHide={()=>{setShowModalAddEvent(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalForAddSchedule />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ScheduleCalander;