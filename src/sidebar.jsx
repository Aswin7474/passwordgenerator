import { useState, useEffect } from "react";
import PasswordGenerator from "./passwordGenerator";


function Sidebar() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [website, setWebsite] = useState("");
    const [passOb, setPassOb] = useState({})
    const [genPassword, setGenPassword] = useState("")

    //const [length, setLength] = useState(14);
    const [settings, setSettings] = useState({
        length: 14, includeSmall: true, includeCapital: true, includeNumbers: true, includeSpecial: true
    });

    const settingsChange = (event) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [event.target.name]: event.target.checked
        }))
    }

    const handleLengthChange = (event) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [event.target.name]: event.target.value
        }))
        console.log(settings.length);
    }


    const addPassword = (event) => {
        event.preventDefault();
        setPassOb(prevPass => ({
            ...prevPass,
            [website]: {
                
                username: username,
                password: password
            }
        }))
        console.log(passOb)
    }

    const generatePassword = (event) => {
        event.preventDefault();
        setGenPassword(PasswordGenerator(settings))
        console.log(genPassword);
    }


    
    return (
        <div className="container">
            <aside className='sidebar'>
                <div className="s_bar_box">
                    <div className="s_bar_element">BitProtector</div>
                    <div className="s_bar_element">About</div>
                    <div className="s_bar_element">Settings</div>
                    <div className="s_bar_element">Password Generator</div>
                </div>
            </aside>


            <div className="main">
                <div id="onefr">a whole load of nothing</div>
                
                <div id="threefr">
                    <div id="stuff">
                        <form onSubmit={addPassword}>
                            <input type="text" placeholder="website" onChange={(event) => setWebsite(event.target.value)} />
                            <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
                            <input type="text" placeholder="password" onChange={(event) => setPassword(event.target.value)} />
                            <button type="submit">Submit</button>
                        </form>
                        <h1>FOR RANDOM GEN PASSWORD</h1>

                        <form onSubmit={addPassword}>
                            <input type="text" placeholder="website" onChange={(event) => setWebsite(event.target.value)} />
                            <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
                            <input type="text" placeholder="password" onChange={(event) => setPassword(PasswordGenerator)} />
                            <button type="submit">Submit</button>
                        </form>
                        <form onSubmit={generatePassword}>
                            <div>
                                <input type="range" id="length" name="length" min="0" max="20" value={settings.length} onChange={handleLengthChange} />
                                <label for="length">length: {settings.length}</label>
                            </div>
                            <div>
                                <input type="checkbox" id="small" name="includeSmall" checked={settings.includeSmall} onChange={settingsChange} />
                                <label for="small">Include Small Characters</label>
                            </div>
                            <div>
                                <input type="checkbox" id="caps" name="includeCapital" checked={settings.includeCapital} onChange={settingsChange} />
                                <label for="caps">Include Capital Characters</label>
                            </div>
                            <div>
                                <input type="checkbox" id="special" name="includeSpecial" checked={settings.includeSpecial} onChange={settingsChange} />
                                <label for="special">Include Special Characters</label>
                            </div>
                            <div>
                                <input type="checkbox" id="nums" name="includeNumbers" checked={settings.includeNumbers} onChange={settingsChange} />
                                <label for="nums">Include Nums</label>
                            </div>
                            <button type="submit">Generate Password</button>
                        </form>

                        {genPassword.length > 0? (<p>{genPassword}</p>): (<p>{}</p>)}


                        <div className="new_button">
                            <button >New</button>
                        </div>
                    </div>
                    <div id="passwordtable">
                        
                        {Object.entries(passOb).map(([key, value]) => (
                            <ul key={key}>
                                {key}: {value.username}: {value.password}
                            </ul>
                        ))}
                    </div>

                </div>

            </div>

            




        </div>
    )
    
}


export default Sidebar;
