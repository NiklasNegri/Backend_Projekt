import React, { useEffect, useState } from "react";

function Profile() {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const userToken = localStorage.getItem("token");

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            <h2>User Email: {email}</h2>
            <h2>User Phone: {phone}</h2>
        </div>
    );

    async function getUserProfile() {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/users/", requestOptions);
        let data = await response.json();
        setEmail(data.email);
        setPhone(data.phone);
    }
}

export default Profile;