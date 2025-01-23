import { useState } from 'react'

import './index.css'

function Passwords() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passOb, setPassOb] = useState({})

    const addPassword = (event) => {
        event.preventDefault();
        passOb[username] = password;
        console.log(passOb);
    } 

    return (
        <div className="main">
                <form onSubmit={addPassword}>
                    <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
                    <input type="text" placeholder="password" onChange={(event) => setPassword(event.target.value)} />
                </form>
        </div>

    )
}


export default Passwords;
