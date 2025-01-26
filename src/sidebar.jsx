import { useState, useEffect, useRef } from "react";
import PasswordGenerator from "./passwordGenerator";
import axios from "axios";


function Sidebar() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [website, setWebsite] = useState("");
    const [passOb, setPassOb] = useState({});
    const [genPassword, setGenPassword] = useState("");
    const [trigger, setTrigger] = useState(1);

    const [newEntry, setNewEntry] = useState({ }) 

    const [editBoxData, setEditBoxData] = useState(null);
    const [newDetails, setNewDetails] = useState({website: "", username: "", password: ""})

    const editDialogRef = useRef(null);
    const addDialogRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:5001/password')
        .then((data) => {
            setPassOb(data.data)
            console.log(JSON.stringify(data.data))
        })
        .catch((error) => console.error(error));

        
    }, [trigger]);

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
        console.log("we got here");

        axios.post('http://localhost:5001/password', {
            website: {
                name: website
            },
            username: username,
            password: password
        })
        .then(() => {
            console.log("Successfully inserted new entry");
            setTrigger((prev) => !prev);
        })
        .catch((error) => console.error(error));

        // setUsername("")
        // setPassword("");
        // setWebsite("");
        
        console.log(`trigger: ${trigger}`);
        
    }

    const deletePassword = (value) => {
        console.log(value)
        axios.delete(`http://localhost:5001/password/${value}`)
        .then((data) => {
            console.log(data);
            setTrigger((prev) => !prev);
        })
        .catch((error) => {
            console.error(error);
        })
        
    }

    const generatePassword = (event) => {
        event.preventDefault();
        const newPass = PasswordGenerator(settings)
        setGenPassword(newPass)
        setPassword(newPass);
        console.log(password);
    }

    const ChangeEditData = (target_id) => {
        setEditBoxData(passOb.find((item) => item._id === target_id));
        console.log(editBoxData);


    }

    const editDetails = (event) => {
        event.preventDefault();
        axios.patch(`http://localhost:5001/password/${editBoxData._id}`, {
            website: editBoxData.website,
            username: editBoxData.username,
            password: editBoxData.password
        })
        .then((data) => {
            console.log(data);
            setTrigger((prev) => !prev);
        })
        .catch((err) => console.error(err));

        
    }

    const handleNewDetails = (event) => {
        setNewDetails({...newDetails, [event.target.name]: event.target.value})
        setEditBoxData({...editBoxData, [event.target.name]: event.target.value})
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
                        <p>FOR RANDOM GEN PASSWORD</p>

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
                            <button type="submit" value={genPassword} onClick={generatePassword}>Generate Password</button>
                        </form>

                        {/* {genPassword.length > 0? (<p>{genPassword}</p>): (<p>{}</p>)} */}


                        <div className="new_button">
                            <button onClick={() => {addDialogRef?.current?.showModal()}} >New</button>
                        </div>
                    </div>
                    <div id="passwordtable">
                        <table className="passwordBoxes">
                                <tr>
                                    <th>Website</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    
                                </tr>
                        
                        {Object.entries(passOb).map(([key, value]) => (
                            
                                <tr id='passwordSmallBoxes'>
                                    <th>{value.website.name}</th>
                                    <th>{value.username}</th>
                                    <th>{value.password}</th> 
                                    <th><button onClick={() => {ChangeEditData(value._id); editDialogRef?.current?.showModal()}}>Edit</button></th>
                                    <th><button onClick={() => {deletePassword(value._id)}} >Delete</button></th>
                                </tr>
                           
                        ))}
                        </table>
                        
                        <dialog ref={editDialogRef} >
                            <div className="editbox">
                                <form onSubmit={editDetails}>
                                    <h3>Website</h3>
                                    <input id='websitebox' name = "website" value={editBoxData ? editBoxData.website.name: ""} onChange={handleNewDetails} />
                                    <br></br>
                                    <h3>Username</h3>
                                    <input id='usernamebox' name="username" value={editBoxData ? editBoxData.username: ""} onChange={handleNewDetails} />
                                    <br></br>
                                    <h3>Password</h3>
                                    <input id='passwordbox' name='password' value={editBoxData ? editBoxData.password: ""} onChange={handleNewDetails} />
                                    <br></br>
                                    <button onClick={() => editDialogRef?.current?.close() }>Cancel</button>
                                    <button type="submit" onClick={() => editDialogRef?.current?.close()}>Save Changes</button>
                                </form>
                            </div>
                        </dialog>

                        <dialog ref={addDialogRef}>
                            <div className="editbox">
                                <form onSubmit={addPassword}>
                                    <input type="text" placeholder="website" onChange={(event) => setWebsite(event.target.value)} />
                                    <br></br>
                                    <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
                                    <br></br>
                                    <input type="text" placeholder="password" value={genPassword ? genPassword : ""} onChange={(event) => setPassword(event.target.value)} />
                                    <button type="button" onClick={generatePassword} >Generate Password</button>
                                    <br></br>
                                    <button onClick={() => {deletePassword(value._id)}}></button>
                                    <button onClick={() => {addDialogRef?.current?.close(); } }>Cancel</button>
                                    <button type="submit" onClick={() => addDialogRef?.current?.close()} >Submit</button>
                                </form>
                            </div>
                        </dialog> 

                                            
                    </div>
                    

                </div>

            </div>
        </div>
    )
    
}


export default Sidebar;
