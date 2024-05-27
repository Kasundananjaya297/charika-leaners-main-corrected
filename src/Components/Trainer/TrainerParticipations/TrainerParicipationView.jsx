import React, { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import { getBookingDatabyID } from "../../ApiService/api";

const TrainerParticipationView = () => {
    const [filterMonth, setFilterMonth] = useState('all');
    const [hideStarted, setHideStarted] = useState(true);
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBookingDatabyID(sessionStorage.getItem('username'));
                if (response?.data?.code === "00") {
                    const bookingData = response?.data?.content;
                    setBookingData(bookingData);
                } else {
                    console.error("Error fetching data:", response?.data?.message);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    const handleMonthChange = (event) => {
        setFilterMonth(event.target.value);
    };

    const handleHideStartedChange = () => {
        setHideStarted(!hideStarted);
    };

    const filteredData = bookingData?.filter((data) => {
        if (filterMonth === 'all') return true;
        const month = new Date(data.start).getMonth() + 1;
        return month === parseInt(filterMonth);
    }).filter(data => hideStarted ? data.completeOn : true);

    return (
        <div className='flex-1 fixed'>
            <div className='h-22 bg-blue-200 p-2'>
                <div className="pl-4">
                    <label htmlFor="monthFilter" className="text-gray-800">Filter by Month:</label>
                    <select id="monthFilter" value={filterMonth} onChange={handleMonthChange} className="ml-2 p-1 rounded-md bg-gray-100">
                        <option value="all">All Year</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {new Date(0, i).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="p-2">
                    <Form.Check
                        type="checkbox"
                        label="Hide uncompleted Sessions"
                        checked={hideStarted}
                        onChange={handleHideStartedChange}
                        className="text-gray-800"
                    />
                </div>
            </div>

            <div className="h-96 overflow-auto w-screen mt-10 text-xs">
                <Table striped bordered hover responsive>
                    <thead>
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
                    <tbody>
                    {filteredData?.map((data, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td>{index + 1}</td>
                            <td>{data?.start ? new Date(data.start).toISOString().split('T')[0] : ''}</td>
                            <td>{data?.start ? new Date(data.start).toISOString().split('T')[1].split('.')[0] : ''}</td>
                            <td>{data?.startedOn ? data.startedOn.split('.')[0] : ''}</td>
                            <td>{data?.completeOn ? data.completeOn.split('.')[0] : ''}</td>
                            <td>{data?.vehicleClass} - {data?.vehicleClassName}</td>
                            <td>{data?.studentCount}</td>
                            <td>{data?.numberofBooking}</td>
                            <td>{data?.numberofAttendance}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default TrainerParticipationView;
