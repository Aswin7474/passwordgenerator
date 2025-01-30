import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordOrText, setPasswordOrText] = useState("password");
    const [showPassword, setShowPassword] = useState(false);
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

    
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
        if (showPassword === false) {
            setPasswordOrText('text');
        }
        else {
            setPasswordOrText('password');
        }
    }

    return (
            <div id="registerloginPage">
                <div id="registerloginBox">
                    <form onSubmit={handleRegister}>
                        <label for="username">Enter Username</label>
                        <input className="usernameForm" placeholder="Username" id="username" type="text" onChange={(event) => setUsername(event.target.value)} />
                        <br></br>
                        <label for="password">Enter Password</label>
                        <input placeholder="Password" id="password" type={passwordOrText} onChange={(event) => setPassword(event.target.value)} />
                        <span><input type="checkbox" checked={showPassword} onChange={handleShowPassword}  /> Show Password </span>
                        <br></br>
                        <button type='submit'>Register</button>
                    </form>
                </div>
            </div>

    )
}


export default Register;
