import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Form, Modal, Container, Col, Row } from "react-bootstrap";

function Admin() {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState();
    const [password, setPassword] = useState("");
    const [workExperience, setWorkExperience] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [userList, setUserList] = useState([]);
    const [updateUserId, setUpdateUserId] = useState("");

    const [newEmailError, setNewEmailError] = useState("");
    const [newPhoneError, setNewPhoneError] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState();
    const [newWorkExperience, setNewWorkExperience] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [roomList, setRoomList] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [roomType, setRoomType] = useState("Spa");
    const [roomError, setRoomError] = useState("");
    const [description, setDescription] = useState("");

    const [bookingList, setBookingList] = useState([]);

    return (
        <div>
            <Container>
                <Row className="justify-content-md-center">
                <Col md="auto">
            <h1>Admin Control</h1>
                <h2>User control</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Work Experience</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    {userList}
                </Table>

                <div>
                    <Button variant="primary" onClick={getUsers}>Get All Users</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="newEmail">
                                    <Form.Label>New Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                    {newEmailError}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="newFirstname">
                                    <Form.Label>New Firstname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newFirstName}
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                    />

                                </Form.Group><Form.Group className="mb-3" controlId="newLastname">
                                    <Form.Label>New Lastname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newLastName}
                                        onChange={(e) => setNewLastName(e.target.value)}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="newPhone">
                                    <Form.Label>New Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newPhone}
                                        onChange={(e) => setNewPhone(e.target.value)}
                                    />
                                    {newPhoneError}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="newRole">
                                    <Form.Label>New Role</Form.Label>
                                    <Form.Select
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Worker">Worker</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="newWE">
                                    <Form.Label>New Work Experience</Form.Label>
                                    <Form.Control
                                        value={newWorkExperience}
                                        onChange={(newWE) => setNewWorkExperience(newWE)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="newPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={updateUser}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="justify-items-center">
                    <label>Register new user</label>                    
                        <Form onSubmit={registerUser}>
                            <Form.Group className="mb-3" controlId="newEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="newFirstname">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={firstName}
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                />

                            </Form.Group><Form.Group className="mb-3" controlId="newLastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={lastName}
                                    required
                                    onChange={(e) => setLastName(e.target.value)}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="newPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="phone"
                                    value={phone}
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {phoneError}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Customer">Customer</option>
                                    <option value="Worker">Worker</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="wE">
                                    <Form.Label>Work Experience</Form.Label>
                                    <Form.Control
                                        value={workExperience}
                                        onChange={(e) => setWorkExperience(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                            <Form.Group className="mb-3" controlId="newPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                </div>
                <h2>Bookings control</h2>
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>Customer Id</th>
                                <th>Room name</th>
                                <th>Worker</th>
                                <th>Start time</th>
                                <th>End time</th>
                            </tr>
                        </thead>
                        {bookingList}
                    </Table>
                    <Button onClick={getBookings}>Show All Bookings</Button>
                </div>
                <h2>Rooms control</h2>
                <div>
                    <Form onSubmit={registerRoom}>
                        <Form.Group className="mb-3" controlId="newRoleName">
                            <Form.Label>Room Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={roomName}
                                required
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                            {roomError}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="desc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {roomError}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="newRoomtype">
                            <Form.Label>Room Type</Form.Label>
                            <Form.Control as="select"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}>
                                <option value="Spa">Spa</option>
                                <option value="MassageRoom">Massage Room</option>
                                <option value="HairSalon">Hair Salon</option>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit">Register Room</Button>
                    </Form>
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Roomname</th>
                                <th>Roomtype</th>
                                <th></th>
                            </tr>
                        </thead>
                        {roomList}
                    </Table>
                    <Button variant="primary" onClick={getRooms}>Show All Rooms</Button>
                </div>
                </Col>
                </Row>
            </Container>
        </div>
    );

    async function registerUser(e) {
        if (phone !== "" && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone)) {
            setPhoneError("Invalid phone number format!");
            e.stopPropagation();
            e.preventDefault();
        }

        else {
            e.preventDefault();
            setPhoneError("");

            console.log(role)

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify({ email: email, firstname: firstName, lastname: lastName, phone: phone, "role": role,
                                     workexperience: workExperience, password: password })
            };

            let response = await fetch('http://localhost:4000/users/register', requestOptions);
            const data = await response.json();

            if (response.status === 200) {
                setEmailError("");
                setPhoneError("");
                window.alert("Registration successfull!");
                getUsers();
            }

            else if (response.status === 400) {
                setEmailError("");
                setPhoneError("");

                if (data === 'Email is already in use!')
                    setEmailError(data.message);
                else
                    setPhoneError(data.message);
            }
        }
    }

    async function getUsers() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/users/allusers", requestOptions);
        let data = await response.json();

        setUserList(data.map((user) =>
            <tbody key={user.id}>
                <tr>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>{user.workexperience}</td>
                    <td>
                        <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete User</Button>
                    </td>
                    <td>
                        <Button variant="primary" onClick={() => startUpdate(user.id)}>
                            Edit User
                        </Button>
                    </td>
                </tr>
            </tbody>));
    }

    function startUpdate(userId) {
        setUpdateUserId(userId);
        handleShow();
    }

    async function deleteUser(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        if (window.confirm("Are you sure you want to delete this user?")) {
            await fetch("http://localhost:4000/users/" + id, requestOptions);
            window.alert("User deleted");
            getUsers();
        }
    }

    async function updateUser(e) {

        if (newPhone !== "" && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(newPhone)) {
            setNewPhoneError("Invalid phone number format!");
            e.stopPropagation();
            e.preventDefault();
        }

        else {
            e.preventDefault();
            setNewPhoneError("");

            let payload = {
                "id": updateUserId,
                "email": newEmail,
                "firstname": newFirstName,
                "lastname": newLastName,
                "phone": newPhone,
                "password": newPassword,
                "role": newRole,
                "newworkexperience": newWorkExperience
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
            const data = await response.text();

            if (response.status === 200) {
                setNewEmailError("");
                setNewPhoneError("");
                handleClose();
                window.alert("User update successfull!");
                getUsers();
            }

            else if (response.status === 400) {
                setNewEmailError("");
                setNewPhoneError("");

                if (data === 'Email is already in use!')
                    setNewEmailError(data);
                else
                    setNewPhoneError(data);
            }
        }
    }

    async function getBookings() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/bookings/allbookings/", requestOptions);
        let data = await response.json();


        setBookingList(data.map((booking) =>
            <tbody key={booking.id}>
                <tr>
                <td>{booking.userId}</td>
                    <td>{booking.roomName}</td>
                    <td>{booking.workerName}</td>
                    <td>{booking.startTime}</td>
                    <td>{booking.endTime}</td>
                    <td><Button variant="outline-danger" onClick={() => deleteBooking(booking.id)}>Delete Booking</Button></td>
                </tr>
            </tbody>));
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
            getBookings();
        }
    }

    async function registerRoom(e) {
        e.preventDefault();

        setRoomError("");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors',
            body: JSON.stringify({ RoomName: roomName, description: description, RoomType: roomType })
        };

        let response = await fetch('http://localhost:4000/bookings/room', requestOptions);
        const data = await response.json();

        if (response.status === 200) {
            setRoomError("");
            getRooms();
        }
        else if (response.status === 400) {
            console.log(data.message);
            setRoomError(data.message);
        }
    }

    async function getRooms() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/bookings/rooms/", requestOptions);
        let data = await response.json();

        setRoomList([data.map((room) =>
            <tbody key={room.id}>
                <tr>
                    <td>{room.id}</td>
                    <td>{room.roomName}</td>
                    <td>{room.roomType}</td>
                    <td>{room.description}</td>
                    <td><Button variant="outline-danger" onClick={() => deleteRoom(room.id)}>Delete Room</Button></td>
                </tr>
            </tbody>)])
    }

    async function deleteRoom(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/bookings/room/" + id, requestOptions);

        if (response.status === 200) {
            window.alert('Room deleted!');
            getRooms();
        }
    }
}

export default Admin;