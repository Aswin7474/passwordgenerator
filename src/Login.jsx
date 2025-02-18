import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordOrText, setPasswordOrText] = useState("password");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        // console.log(username, password)
        axios.post('http://localhost:5001/login', {
            username: username,
            password: password
        })
        .then((data) => {
            // console.log(data);
            Cookies.set('username', username, { expires: 1})
            navigate('/');
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
        <div id="registerloginPage" >
            <div id="registerloginBox"  >
                <form onSubmit={handleLogin}>
                    <label id="enterdetails" for="username">Enter Username</label>
                    <input style={{backgroundColor: "white"}} placeholder="Username" id="username" type="text" onChange={(event) => setUsername(event.target.value)} />
                    <br></br>
                    <label id="enterdetails" for="password">Enter Password</label>
                    <input style={{backgroundColor: "white"}} placeholder="Password" id="password" type={passwordOrText} onChange={(event) => setPassword(event.target.value)} />
                    <span><input type="checkbox" checked={showPassword} onChange={handleShowPassword} /> Show Password </span>
                    <br></br>
                    <button type='submit'>Login</button> 
                    
                </form>
                <br></br>
                <h4 onClick={() => navigate('/register')}>New user? Click here</h4>
            </div>
        </div>
    )
}

export default Login;
