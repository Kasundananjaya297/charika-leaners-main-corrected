import ScheduleCalender from "./Forms/Shedule/ScheduleCalender";


function Schedule(props) {
    return (
        <div className='flex flex-col h-dvh mb-2'>
            <div className='flex flex-col overflow-y-scroll h-full p-4'>
                <div className='flex flex-wrap'>
                    <ScheduleCalender/>
                </div>
            </div>
        </div>

    );
}

export default Schedule;
