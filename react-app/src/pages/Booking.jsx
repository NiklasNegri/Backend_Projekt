import React, { useEffect, useState } from "react";

function Booking() {

    const [allWorkerIds, setAllWorkerIds] = useState([]);
    const [allRoomIds, setAllRoomIds] = useState([]);

    const [roomId, setRoomId] = useState("");
    const [workerId, setWorkerId] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
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

                <label>Select a room</label>
                <select onChange={(e) => setRoomId(e.target.value)}>
                    <option />
                    {allRoomIds.map((roomId) =>
                        <option key={roomId} value={roomId}>{roomId}</option>)}
                </select>

                <label>Select a worker</label>
                <select onChange={(e) => setWorkerId(e.target.value)}>
                    <option />
                    {allWorkerIds.map((workerId) =>
                        <option key={workerId} value={workerId}>{workerId}</option>)}
                </select>

                <input
                    value={startTime}
                    placeholder="Enter start time"
                    onChange={(e) => setStartTime(e.target.value)}
                />

                <input
                    value={endTime}
                    placeholder="Enter end time"
                    onChange={(e) => setEndTime(e.target.value)}
                />

                <input
                    value={duration}
                    placeholder="Enter duration"
                    onChange={(e) => setDuration(e.target.value)}
                />

                <button type="submit"></button>

                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    );

    async function createUserBooking(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors',
            body: JSON.stringify({
                roomId: roomId,
                workerId: workerId,
                startTime: startTime,
                endTime: endTime,
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

        setAllRoomIds(roomsData);
        setAllWorkerIds(workersData);
    }
}

export default Booking;