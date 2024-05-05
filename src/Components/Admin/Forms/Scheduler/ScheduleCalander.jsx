import React from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar, momentLocalizer} from "react-big-calendar";

const localizer = momentLocalizer(moment);

// Define your events list
const myEventsList = [
    {
        title: 'Event 1',
        start: new Date(2024, 3, 1), // Month is 0-indexed (April)
        end: new Date(2024, 3, 2), // Month is 0-indexed (April)
    },
    {
        title: 'Event 2',
        start: new Date(2024, 3, 5), // Month is 0-indexed (April)
        end: new Date(2024, 3, 6), // Month is 0-indexed (April)
    },
    // Add more events as needed
];
function ScheduleCalander(props) {
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 800 }}
            />
        </div>
    );
}

export default ScheduleCalander;