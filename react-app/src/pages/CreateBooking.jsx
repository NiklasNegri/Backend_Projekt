import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function CreateBooking() {

    const [allWorkers, setAllWorkers] = useState([]);
    const [allRooms, setAllRooms] = useState([]);

    const [roomId, setRoomId] = useState("");
    const [workerId, setWorkerId] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [duration, setDuration] = useState("");

    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchWorkerRoomIds();
    }, []);

    return (
        <div>
            <h1>Create Booking</h1>
            <form onSubmit={createUserBooking}>

                <input
                    value={roomId}
                    placeholder="Enter room id"
                    onChange={(e) => setRoomId(e.target.value)}
                />

                <input
                    value={workerId}
                    placeholder="Enter worker id"
                    onChange={(e) => setWorkerId(e.target.value)}
                />

                <DatePicker
                    selected={startTime}
                    onChange={setStartTime}
                    showTimeSelect
                    dateFormat="Pp"
                />

                <input
                    value={duration}
                    placeholder="Enter duration in minutes"
                    onChange={(e) => setDuration(e.target.value)}
                />
                <button type="submit"></button>

                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
            <div>
                {allRooms}
            </div>
            <div>
                {allWorkers}
            </div>
        </div>
    );

    async function createUserBooking(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors',
            body: JSON.stringify({
                customerId: parsedUser.id,
                roomId: roomId,
                workerId: workerId,
                startTime: startTime,
                duration: duration,
            })
        };

        let response = await fetch("http://localhost:4000/users/booking/", requestOptions);
        console.log(roomId, workerId);
        if (response.status === 200) {
            setMessage("Booking created successfully!")
        }
        else {
            setMessage("Error!")
        }
    }

    async function fetchWorkerRoomIds() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        const roomsResponse = await fetch("http://localhost:4000/users/rooms/", requestOptions);
        const roomsData = await roomsResponse.json();
        const workersResponse = await fetch("http://localhost:4000/users/workers/", requestOptions);
        const workersData = await workersResponse.json();

        setAllRooms(roomsData.map((room) =>
            <li key={room.id}>
                <div onClick={() => chooseRoom(room.id)}>Room name: {room.roomName}</div>
                <div>Room type: {room.roomType}</div>
            </li>));

        setAllWorkers(workersData.map((worker) =>
            <li key={worker.id}>
                <div onClick={() => chooseWorker(worker.id)}>Worker email: {worker.email}</div>
                <div>Name: {worker.firstname} {worker.lastname} </div>
            </li>));
    }

    function chooseRoom(room) {
        setRoomId(room);
        setAllRooms(null);
    }

    function chooseWorker(worker) {
        setWorkerId(worker);
        setAllWorkers(null);
    }
}

export default CreateBooking;