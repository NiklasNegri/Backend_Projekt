import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Col, Row, Container, Button, Modal, Alert } from 'react-bootstrap';


function Profile() {
    const navigate = useNavigate();

    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Form>
                <Form.Label>
                    User Profile
                </Form.Label>
                <Form.Group as={Row} className="mb-3" controlId="userEmail">
                    <Form.Label column="sm-2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext defaultValue={parsedUser.email} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="userFirstname">
                    <Form.Label column="sm-2">
                        Firstname
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={parsedUser.firstname} />
                    </Col>
                </Form.Group><Form.Group as={Row} className="mb-3" controlId="userLastname">
                    <Form.Label column="sm-2">
                        Lastname
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={parsedUser.lastname} />
                    </Col>
                </Form.Group><Form.Group as={Row} className="mb-3" controlId="userPhone">
                    <Form.Label column="sm-2">
                        Phone number
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={parsedUser.phone} />
                    </Col>
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleShow}>
                Edit user profile
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
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                type="text"
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
        </Container>
    );

    async function deleteUser(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors',
            body: JSON.stringify({ "id": parsedUser.id })
        };

        if (window.confirm('Are you sure you want to delete your account?')) {
            await fetch('http://localhost:4000/users/' + parsedUser.id, requestOptions);
            window.alert('User deleted');
            localStorage.clear();
            navigate("/login");
            window.location.reload();
        }
        else {

        }
    }

    async function updateUser(e) {

        e.preventDefault();

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
        handleClose();
        localStorage.clear();
        window.location.reload();
    }
}

export default Profile;