import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Register() {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const navigate = useNavigate();

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
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

                        </Form.Group><Form.Group className="mb-3" controlId="newPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="phone"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {phoneError}
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
                </Col>
            </Row>
        </Container>
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

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify({ email: email, firstname: firstName, lastname: lastName, phone: phone, password: password })
            };

            let response = await fetch('http://localhost:4000/users/register', requestOptions);
            const data = await response.json();

            if (response.status === 200) {
                setEmailError("");
                setPhoneError("");
                window.alert("Registration successfull!");
                navigate('/login');
            }

            else if (response.status === 400) {
                setEmailError("");
                setPhoneError("");

                if (data.message = 'Email is already in use!')
                    setEmailError(data.message);
                else
                    setPhoneError(data.message);
            }
        }
    }
}

export default Register;