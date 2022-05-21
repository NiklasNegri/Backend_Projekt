import React, { useEffect, useState } from "react";

function Profile() {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            <h2>User Email: {email}</h2>
            <h2>User Phone: {phone}</h2>

            /* lägg till knapp för att ändra sina uppgifter*/
        </div>
    );

         // nödvändigt för att få fram password då det ej returneras i authenticate
         // för extra säkerhet då denna fetch kräver JWT token som hämtas från första
         
    async function getUserProfile() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': parsedUser.token },
            mode: 'cors'
        };

        let response = await fetch("http://localhost:4000/users/", requestOptions);
        let data = await response.json();
        setEmail(data.email);
        setPhone(data.phone);
    }
}

export default Profile;