import React, { useEffect, useState } from "react";

function Register() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div>
            <form onSubmit={registerUser}>

                <input
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    value={phone}
                    placeholder="Enter phone number"
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    value={password}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Register</button>
                <div className="message">{message ? <p>{message}</p> : null}</div>

            </form>
        </div>
    );

    async function registerUser(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ email: email, phone: phone, password: password })
        };

        let response = await fetch('http://localhost:4000/users/register', requestOptions);
        const data = await response.json();

        if (response.status === 200) {
            setMessage("User created successfully!")
        }
        else {
            setMessage("Error!")
        }

        console.log(data);
        /* navigate("/profile"); */

        /*  window.location.reload(); */
    }
}


export default Register;