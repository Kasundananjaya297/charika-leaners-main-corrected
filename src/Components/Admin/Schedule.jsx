import ScheduleCalander from "./Forms/Scheduler/ScheduleCalander";


function Schedule(props) {
    return (
        <div className="flex flex-col h-dvh mb-2">
            <div className="flex flex-col overflow-y-scroll  h-full">
                <div className="p-8">
                    <ScheduleCalander />
                </div>
            </div>
        </div>
    );
}

export default Schedule;
