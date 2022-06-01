import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

export default function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    return (
        <Container>
            <Form onSubmit={authenticate}>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Form.Label>Email address</Form.Label>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control value={email} type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        {emailError}
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        {passwordError}
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );

    async function authenticate(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        };

        let response = await fetch('http://localhost:4000/users/authenticate', requestOptions);
        const data = await response.json();

        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/profile");
            window.location.reload();
        }

        else {
            setEmailError("")
            setPasswordError("")
            switch (data.message) {
                case email.toString() + " is not registered to any account!":
                    setEmailError(data.message);
                    break;

                case "Wrong password entered!":
                    setPasswordError(data.message);
                    break;
            }
        }
    }
}