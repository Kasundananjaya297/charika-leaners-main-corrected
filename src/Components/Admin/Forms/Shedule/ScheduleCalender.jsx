import React from 'react';
import {Scheduler} from "@aldabil/react-scheduler";

function ScheduleCalender(props) {

    const scheduleData = [
        {
            id: 1,
            title: 'Meeting',
            start: new Date(2024, 4, 5, 8, 0), // May 5, 2024, 10:00 AM
            end: new Date(2024, 4, 5, 12, 0), // May 5, 2024, 12:00 PM
        },
        // Add more schedule items as needed
    ];
    return (
        <div>
            <Scheduler/>
        </div>
    );
}

export default ScheduleCalender;