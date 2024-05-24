import React, {useState} from 'react';

const TrainerParicipationView = () => {
    const [bookingSchedules, setBookingSchedules] = useState([]);
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Is Accepted</th>
                    <th>Is Canceled</th>
                </tr>
                </thead>
                <tbody>
                {bookingSchedules.map((booking) => (
                    <tr key={booking.bookingID}>
                        <td>{booking.bookingDate}</td>
                        <td>{booking.bookingTime}</td>
                        <td>{booking.stdID}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainerParicipationView;