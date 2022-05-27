import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

export default function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container>
            <Form onSubmit={authenticate}>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Label>Email address</Form.Label>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs="auto">
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs="auto">

                        <Button variant="primary" type="submit">
                            Submit
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
                email: email,
                password: password
            })
        };

        let response = await fetch('http://localhost:4000/users/authenticate', requestOptions);
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));

        navigate("/profile");
        window.location.reload();
    }
}