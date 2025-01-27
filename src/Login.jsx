import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        console.log(username, password)
        axios.post('http://localhost:5001/login', {
            username: username,
            password: password
        })
        .then((data) => {
            console.log(data);
            Cookies.set('username', username, { expires: 1})
            navigate('/');
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input placeholder="Username" id="username" type="text" onChange={(event) => setUsername(event.target.value)} />
                <br></br>
                <input placeholder="Password" id="password" onChange={(event) => setPassword(event.target.value)} />
                <br></br>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Login;
