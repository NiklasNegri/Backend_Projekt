import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="authenticatePage">
            <form onSubmit={authenticate}>
                <input
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    value={password}
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
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
        /* .then(response => response.json())
        .then(data => setToken(data.token))
        .then(response => setUser(response.data))
        .then(localStorage.setItem("token", token)) */
        localStorage.setItem("token", data.token);
        console.log(data.token);
        navigate("/profile");

        window.location.reload();
    }
}