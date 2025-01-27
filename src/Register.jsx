import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();

        console.log(username, password)
        axios.post('http://localhost:5001/register', {
            username: username,
            password: password
        })
        .then((data) => {
            console.log(data);
            navigate('/login');
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
            <div>
                <form onSubmit={handleRegister}>
                    <input placeholder="Username" id="username" type="text" onChange={(event) => setUsername(event.target.value)} />
                    <br></br>
                    <input placeholder="Password" id="password" onChange={(event) => setPassword(event.target.value)} />
                    <br></br>
                    <button type='submit'>Register</button>
                </form>
            </div>

    )
}


export default Register;
