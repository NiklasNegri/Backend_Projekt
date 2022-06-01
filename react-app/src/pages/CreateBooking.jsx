import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";


function CreateBooking() {

    const [workerHeader, setWorkerHeader] = useState("");
    const [roomHeader, setRoomHeader] = useState("");
    const [roomLabel, setRoomLabel] = useState("");
    const [workerLabel, setWorkerLabel] = useState("");
    const [completeButton, setCompleteButton] = useState("");

    const [allWorkers, setAllWorkers] = useState([]);
    const [workerData, setWorkerData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [allRooms, setAllRooms] = useState([]);

    const [roomId, setRoomId] = useState();
    const [workerId, setWorkerId] = useState();
    const [startTime, setStartTime] = useState(new Date());

    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    useEffect(() => {
        updateDate()
    }, [startTime, workerId, roomId])

    return (
        <div>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Form>
                            <h3>Choose date and time for appointment</h3>
                            <DatePicker
                                selected={startTime}
                                onChange={(time) => setStartTime(time)}
                                inline
                                showTimeSelect
                                minDate={new Date()}
                                dateFormat="yyyy/MM/dd HH:MM:SS"
                            />
                            <div>
                                {roomLabel}
                                <Table className="align-center">
                                    {roomHeader}
                                    {allRooms}
                                </Table>;
                                {workerLabel}
                                <Table>
                                    {workerHeader}
                                    {allWorkers}
                                </Table>
                            </div>
                        </Form >
                        {completeButton}
                    </Col>
                </Row>
            </Container>
        </div>
    );

    async function updateDate() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        var tzoffset = (new Date()).getTimezoneOffset() * 60000;

        const dateString = new Date(startTime - tzoffset).toISOString().slice(0, -1);
        const roomsResponse = await fetch("http://localhost:4000/bookings/availablerooms/" + dateString, requestOptions);
        setRoomData(await roomsResponse.json())


        setRoomLabel(<h6>Available rooms for {startTime.toLocaleString()}</h6>);
        setRoomHeader(
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Roomname</th>
                    <th>Roomtype</th>
                    <th></th>
                </tr>
            </thead>);

        setAllRooms(roomData.map((room) =>
            <tbody key={room.id}>
                <tr>
                    <td>{room.id}</td>
                    <td>{room.roomName}</td>
                    <td>{room.roomType}</td>
                    <td><Button variant="outline-dark" onClick={() => setRoomId(room.id)}>Book worker</Button></td>
                </tr>
            </tbody>))

        const workersResponse = await fetch("http://localhost:4000/bookings/availableworkers/" + dateString, requestOptions);
        setWorkerData(await workersResponse.json())

        setWorkerLabel(<h6>Available workers for {startTime.toLocaleString()}</h6>)
        setWorkerHeader(
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th></th>
                </tr>
            </thead>);

        setAllWorkers(workerData.map((worker) =>
            <tbody key={worker.id}>
                <tr>
                    <td>{worker.id}</td>
                    <td>{worker.email}</td>
                    <td>{worker.firstname}</td>
                    <td>{worker.lastname}</td>
                    <td><Button variant="outline-dark" onClick={() => setWorkerId(worker.id)}>Book worker</Button></td>
                </tr>
            </tbody>))

        setCompleteButton(<Button variant="primary" onClick={() => createUserBooking()}>Complete booking</Button>)
    }

    async function createUserBooking() {
        console.log(workerId)
        console.log(roomId)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors',
            body: JSON.stringify({
                userId: parsedUser.id,
                "roomid": roomId,
                "workerId": workerId,
                startTime: startTime,
                duration: 60,
            })
        };

        await fetch("http://localhost:4000/bookings/booking/", requestOptions);
        window.alert("Booking complete");
    }
}
export default CreateBooking;