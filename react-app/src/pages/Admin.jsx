import React, { useEffect, useState } from "react";
import { findDOMNode } from "react-dom";

function Admin() {
    const authuser = localStorage.getItem("user");
    const parsedUser = JSON.parse(authuser);

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [userList, setUserList] = useState([]);

    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState("");

    const [roomList, setRoomList] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [roomType, setRoomType] = useState("");

    const [bookingList, setBookingList] = useState([]);

    return (
        <div>
            <h1>User control</h1>
            <div>
                <button onClick={getUsers}>Get All Users</button>
            </div>
            <div>
                <label>Register new user</label>
                <form onSubmit={registerUser}>
                    <input
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        value={firstName}
                        placeholder="Enter firstname"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        value={lastName}
                        placeholder="Enter lastname"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        value={password}
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        value={phone}
                        placeholder="Enter phone number"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                        <option value="Worker">Worker</option>
                    </select>
                    <button type="submit">Register</button>
                </form>
            </div>
            <div>
                <label>Update User</label>
                <form onSubmit={updateUser}>
                    <input
                        value={id}
                        placeholder="Enter user id"
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input
                        value={newEmail}
                        placeholder="Enter new email"
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <input
                        value={newPassword}
                        placeholder="Enter new password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        value={newPhone}
                        placeholder="Enter new phone number"
                        onChange={(e) => setNewPhone(e.target.value)}
                    />
                    <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                    >
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                        <option value="Worker">Worker</option>
                    </select>
                    <button type="submit">Update</button>
                </form>
            </div>
            <h1>Bookings control</h1>
            <div>
                <button onClick={getBookings}>Show All Bookings</button>
                {bookingList}
            </div>
            <h1>Rooms control</h1>
            <div>
                <label>Register Room</label>
                <form onSubmit={registerRoom}>
                    <input
                        value={roomName}
                        placeholder="Enter room name"
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                    <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                    >
                        <option value="Spa">Spa</option>
                        <option value="MassageRoom">Massage Room</option>
                        <option value="HairSalon">Hair Salon</option>
                    </select>
                    <button type="submit">Register</button>
                </form>
            </div>
            <div>
                <button onClick={getRooms}>Show All Rooms</button>
                {roomList}
            </div>
        </div>
    );

    async function registerUser(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ email: email, firstname: firstName, lastname: lastName, phone: phone, password: password })
        };

        let response = await fetch('http://localhost:4000/users/register', requestOptions);
        const data = await response.json();

        if (response.status === 200) {
            window.location.reload();
        }
        else {
            // validerings fel
        }
    }

    async function getUsers() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/admins/get/all/", requestOptions);
        let data = await response.json();

        if (!userList) {
            setUserList(data.map((user) =>
                <li key={user.id}>
                    <div>Id: {user.id}</div>
                    <div>Email: {user.email}</div>
                    <div>Firstname: {user.firstname}</div>
                    <div>Lastname: {user.lastname}</div>
                    <div>Phone: {user.phone}</div>
                    <div>Role: {user.role}</div>
                    <button onClick={() => deleteUser(user.id)}>Delete User</button>
                </li>
            ))
        }
        else {
            setUserList(null);
        }
    }

    async function deleteUser(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/admins/delete/" + id, requestOptions);

        if (response.status === 200) {
            window.alert("User deleted");
        }
        else {
        }
    }

    async function updateUser() {

        let payload = {
            "id": id,
            "email": newEmail,
            "phone": newPhone,
            "password": newPassword,
            "role": newRole
        }

        for (var key of Object.keys(payload)) {
            if (!payload[key]) {
                delete payload[key];
            }
        };

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors',
            body: JSON.stringify(payload)
        };

        let response = await fetch('http://localhost:4000/users/update', requestOptions);
        const data = await response.json();
    }

    async function getBookings() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/admins/bookings/", requestOptions);
        let data = await response.json();

        if (!bookingList) {
            setBookingList(data.map((booking) =>
                <li key={booking.id}>
                    <div>Id: {booking.id}</div>
                    <div>Customer: {booking.customerId}</div>
                    <div>Worker: {booking.workerId}</div>
                    <div>Room: {booking.roomId}</div>
                    <div>Date: {booking.startTime} - {booking.endTime}</div>
                    <button onClick={() => deleteBooking(booking.id)}>Delete Booking</button>
                </li>))
        }
        else {
            setBookingList(null);
        }
    }

    async function deleteBooking(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/admins/bookings/" + id, requestOptions);

        if (response.status === 200) {
            window.alert('Booking deleted!');
            getBookings();
        }

        else {
        }
    }

    async function registerRoom() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors',
            body: JSON.stringify({ RoomName: roomName, RoomType: roomType })
        };

        let response = await fetch('http://localhost:4000/admins/rooms/register', requestOptions);
        const data = await response.json();

        if (response.status === 200) {
            // validerings OK
        }
        else {
            // validerings fel
        }
    }

    async function getRooms() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/admins/rooms/get/", requestOptions);
        let data = await response.json();

        if (!roomList) {
            setRoomList([data.map((room) =>
                <li key={room.id}>
                    <div>Id: {room.id}</div>
                    <div>Room name: {room.roomName}</div>
                    <div>Room type: {room.roomType}</div>
                    <button onClick={() => deleteRoom(room.id)}>Delete</button>
                </li>)])
        }
        else {
            setRoomList(null);
        }
    }

    async function deleteRoom(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/admins/rooms/" + id, requestOptions);

        if (response.status === 200) {
            window.alert('Room deleted!');
            getRooms();
        }

        else {
        }
    }
}
export default Admin;