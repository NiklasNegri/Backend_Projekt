import React, { useEffect, useState } from "react";
import { render } from "react-dom";

function BookingHistory() {

    const [bookings, setBookings] = useState({});
    const [list, setList] = useState([]);

    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);


    useEffect(() => {
        getUserBookings();
    }, []);

    return (
        <div>
            <ul>
                {list}
            </ul>
        </div>
    )

    async function getUserBookings() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/users/booking/", requestOptions);
        let data = await response.json();
        setBookings(data);

        setList(data.map((booking) =>
            <li key={booking.id}>
                <div>{parsedUser.firstname} {parsedUser.lastname}</div>
                <div>is booked with worker {booking.workerName}</div>
                <div>in room {booking.roomName}</div>
                <div>at {booking.startTime} - {booking.endTime}</div>
            </li>))
        
    }
}

export default BookingHistory;