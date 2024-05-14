import ScheduleCalander from "./Forms/Scheduler/ScheduleCalander";


function Schedule(props) {
    return (
        <div className="flex flex-col h-dvh mb-2">
            <div className="flex flex-col overflow-auto  h-full">
                <div className="items-center w-full flex p-8 flex-row">
                    <ScheduleCalander />
                </div>
            </div>
        </div>
    );
}

export default Schedule;
