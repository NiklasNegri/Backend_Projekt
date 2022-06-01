import React, { useEffect, useState } from "react";
import { Table, Button, Popover } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

function BookingHistory() {

    const [activeBookings, setActiveBookings] = useState("");
    const [pastBookings, setPastBookings] = useState("");
    const [workerDetails, setWorkerDetails] = useState([]);

    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);


    useEffect(() => {
        getUserBookings();
    }, [user]);

    return (
        <Container>
            <Row className="justify-content-md-center">
            {workerDetails}

                <Col md="auto">
                    <h3>Active Bookings</h3>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Room name</th>
                                <th>Worker</th>
                                <th>Start time</th>
                                <th>End time</th>
                                <th>Edit booking</th>
                            </tr>
                        </thead>
                        {activeBookings}
                    </Table>
                    <h3>Past Bookings</h3>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Room name</th>
                                <th>Worker</th>
                                <th>Start time</th>
                                <th>End time</th>
                            </tr>
                        </thead>
                        {pastBookings}
                    </Table>
                </Col>
            </Row>
        </Container>
    )

    async function getUserBookings() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let link = "http://localhost:4000/bookings/userbookings/";

        let response = await fetch(link, requestOptions);
        let data = await response.json();

        let pastBookings = [];
        let activeBookings = [];

        for (let i = 0; i < data.length; i++) {
            if (data[i].endTime < new Date(Date.now()).toISOString()) {
                pastBookings.push(data[i]);
            }
            else {
                activeBookings.push(data[i]);
            }
        }

        setActiveBookings(activeBookings.map((booking) =>
            <tbody key={booking.id}>
                <tr>
                    <td>{booking.roomName}</td>
                    <td>{booking.workerName}</td>
                    <td>{booking.startTime}</td>
                    <td>{booking.endTime}</td>
                    <td><Button variant="outline-danger" onClick={() => deleteBooking(booking.id)}>Delete Booking</Button></td>
                    <th><Button onClick={() => getWorkerDetails(booking.workerId)}>Worker Details</Button></th>
                </tr>
            </tbody>));

        setPastBookings(pastBookings.map((booking) =>
            <tbody key={booking.id}>
                <tr>
                    <td>{booking.roomName}</td>
                    <td>{booking.workerName}</td>
                    <td>{booking.startTime}</td>
                    <td>{booking.endTime}</td>
                    <th><Button onClick={() => getWorkerDetails(booking.workerId)}>Worker Details</Button></th>
                </tr>
            </tbody>));
    }

    async function getWorkerDetails(workerId) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        const response = await fetch("http://localhost:4000/users/" + workerId, requestOptions);
        const workerData = await response.json();

        setWorkerDetails(
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Work experience</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{workerData.firstname} {workerData.lastname} </td>
                        <td>{workerData.email}</td>
                        <td>{workerData.phone}</td>
                        <td>{workerData.workExperience}</td>
                    </tr>
                </tbody>
            </Table>);
    }

    function deleteBooking(bookingId) {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        if (window.confirm("Are you sure you want to cancel this booking?")) {
            fetch("http://localhost:4000/bookings/booking/" + bookingId, requestOptions);
            window.alert("Booking canceled!");
            window.location.reload();
        }
    }
}

export default BookingHistory;