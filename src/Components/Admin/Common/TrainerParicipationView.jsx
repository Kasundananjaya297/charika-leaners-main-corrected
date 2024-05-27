import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';

const TrainerParticipationView = ({ bookingData }) => {
    const [filterMonth, setFilterMonth] = useState('all');
    const [hideStarted, setHideStarted] = useState(true);


    const handleMonthChange = (event) => {
        setFilterMonth(event.target.value);
    };

    const handleHideStartedChange = () => {
        setHideStarted(!hideStarted);
    };

    const filteredData = bookingData?.schedulerDTO?.filter((data) => {
        if (filterMonth === 'all') return true;
        const month = new Date(data.start).getMonth() + 1;
        return month === parseInt(filterMonth);
    }).filter(data => hideStarted ? data.completeOn : true);

    return (
        <div>
            <div>
                <div className="bg-slate-100 w-fit p-3 rounded-md mb-3 text-sm">
                    <table className="gap-y-1">
                        <tbody>
                        <tr>
                            <td>Trainer ID:</td>
                            <td className="pl-4">{bookingData?.trainerID}</td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td className="pl-4">{bookingData?.fname} {bookingData?.lname}</td>
                        </tr>
                        <tr>
                            <td>NIC:</td>
                            <td className="pl-4">{bookingData?.nic}</td>
                        </tr>
                        <tr>
                            <td>Contact:</td>
                            <td className="pl-4">{bookingData?.telephone}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="monthFilter">Filter by Month:</label>
                <select id="monthFilter" value={filterMonth} onChange={handleMonthChange} className="ml-2">
                    <option value="all">All Year</option>
                    {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Hide uncompleted Sessions"
                    checked={hideStarted}
                    onChange={handleHideStartedChange}
                />
            </div>

            <div className="h-96 overflow-y-scroll">
                <Table className="flex flex-row">
                    <thead className="text-sm">
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Start (Planned)</th>
                        <th>Started</th>
                        <th>Completed</th>
                        <th>Vehicle</th>
                        <th>Max Participant</th>
                        <th>No. Booking</th>
                        <th>No. Attendance</th>
                    </tr>
                    </thead>
                    <tbody className="text-xs">
                    {filteredData?.map((data, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data?.start ? new Date(data.start).toISOString().split('T')[0] : ''}</td>
                            <td>{data?.start ? new Date(data.start).toISOString().split('T')[1].split('.')[0] : ''}</td>
                            <td>{data?.startedOn ? data.startedOn.split('.')[0] : ''}</td>
                            <td>{data?.completeOn ? data.completeOn.split('.')[0] : ''}</td>
                            <td>{data?.vehicleClass} - {data?.vehicleClassName}</td>
                            <td>{data?.studentCount}</td>
                            <td>
                                {data?.numberofBooking}
                            </td>
                            <td>
                                {data?.numberofAttendance}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default TrainerParticipationView;
