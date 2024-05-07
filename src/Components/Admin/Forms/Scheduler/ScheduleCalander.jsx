import React, {useEffect, useState} from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar, momentLocalizer} from "react-big-calendar";
import {Modal} from "react-bootstrap";
import ModalForAddSchedule from "./ModalForAddSchedule";
import {getAllSchedules} from "../../../ApiService/api";

const localizer = momentLocalizer(moment);


function ScheduleCalander(props) {

    const [eventList, setEventList] = useState([])
    const [selectedDate, setSelectedDate] = useState('')
    //hook for add new event
    const[showModalAddEvent, setShowModalAddEvent] = useState(false)
    const [interrupt, setInterrupt] = useState(false)



    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllSchedules();
            if(response?.data?.code ==="00"){
                setEventList(response.data.content)
            }
        }
        fetchData();
    }, [interrupt]);
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={eventList}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event => {console.log("clicked event", event)}}
                onSelectSlot={(e) => {setSelectedDate(new Date(e.start));setShowModalAddEvent(true)}}
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
        </div>
    );
}

export default ScheduleCalander;