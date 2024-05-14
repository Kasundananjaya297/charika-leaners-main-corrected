import React from 'react';
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment/moment";

const localizer = momentLocalizer(moment);

const StudentSchedules = () => {
    return (
        <div className='flex flex-row items-center justify-center w-full p-4 mt-4'>
            <Calendar
                localizer={localizer}
                // events={eventList}
                startAccessor="start"
                endAccessor="end"
                // onSelectEvent={event => {setSelectedEvent(event);setShowModalEventDetails(true)}}
                // onSelectSlot={(e) => {setSelectedDate(new Date(e.start));setShowModalAddEvent(true)}}
                eventPropGetter={event => {
                    const backgroundColor = 'green';
                    return { style: { backgroundColor } };
                }}
                selectable
                style={{ height: 350 , width: 350}}
            />

        </div>
    );
};

export default StudentSchedules;