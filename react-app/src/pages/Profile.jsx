import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Button, Modal, Row, Col } from 'react-bootstrap';


function Profile() {
    const navigate = useNavigate();

    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
            <Form>
                <h3>User Profile</h3>
                <p>Name: {parsedUser.firstname} {parsedUser.lastname}</p>
                <p>Email: {parsedUser.email}</p>
                <p>Phone: {parsedUser.phone}</p>

            </Form>
            <Button variant="primary" onClick={handleShow}>
                Edit user profile
            </Button>
            <Button variant="danger" onClick={deleteUser}>
                Delete account
            </Button>

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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="newFirstname">
                            <Form.Label>New Firstname</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                        </Form.Group><Form.Group className="mb-3" controlId="newLastname">
                            <Form.Label>New Lastname</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                        </Form.Group><Form.Group className="mb-3" controlId="newPhone">
                            <Form.Label>New Phone</Form.Label>
                            <Form.Control
                                type="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {phoneError}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
            </Col>
            </Row>
        </Container>
    );

    async function deleteUser() {

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };
        let link = "http://localhost:4000/users/" + parsedUser.Id;
        if (window.confirm('Are you sure you want to delete your account?')) {
            await fetch(link, requestOptions);
            window.alert('User deleted');
            
        }
    }

    async function updateUser(e) {

        if (phone != "") {

            if (!/[0-9]/.test(phone)) {

                setPhoneError("Phone number must be only digits!");
                e.preventDefault();
            }
        }

        let payload = {
            "id": parsedUser.id,
            "email": email,
            "firstname": firstName,
            "lastname": lastName,
            "phone": phone,
            "password": password,
            "role": parsedUser.role
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
            setEmailError("");
            setPhoneError("");
            handleClose();
            window.alert("Profile update successfull!");
            localStorage.clear();
            window.location.reload();
            navigate('/login');
        }

        else if (response.status === 400) {
            setEmailError("");
            setPhoneError("");

            if (data === 'Email is already in use!')
                setEmailError(data);
            else
                setPhoneError(data);
        }
    }
}

export default Profile;