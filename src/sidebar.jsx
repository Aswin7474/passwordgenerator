import { useState, useEffect, useRef } from "react";
import PasswordGenerator from "./passwordGenerator";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Sidebar() {
    const lightMode = ['#165ad5', '#ffffff', "#333333", "#FFFFFF", "#19138f", "#FFFFFF"];
    const darkMode = ['#7E56C2', '#1E2129', "#ADB0B6", "#000000", "#5A3E9A", '#1E2129'];
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [website, setWebsite] = useState("");
    const [passObject, setPassObject] = useState({});
    const [trigger, setTrigger] = useState(1);
    const navigate = useNavigate();
    const [formStatus, setFormStatus] = useState(false);
    const [settings, setSettings] = useState({
        length: 14, includeSmall: true, includeCapital: true, includeNumbers: true, includeSpecial: true
    });
    const currentUser = Cookies.get('username') ? Cookies.get('username'): null

    const [editBoxData, setEditBoxData] = useState(null);
    const [newDetails, setNewDetails] = useState({website: "", username: "", password: ""})
    const [themeColors, setThemeColors] = useState(darkMode);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7;

    const editDialogRef = useRef(null);
    const addDialogRef = useRef(null);

    const [displayedWebsites, setDisplayedWebsites] = useState([])
    const [startIndex, setStartIndex] = useState(1);
    
    // Retrieves passwords for current user from api
    useEffect(() => {
        if (currentUser === null) {
            navigate('/login');
        }
        axios.get(`http://localhost:5001/password/${currentUser}`)
        .then((data) => {
            setPassObject(data.data)
            // console.log(JSON.stringify(data.data))
        })
        .then(() => {
            const websites = passObject[0]?.websites || [];
            setStartIndex((currentPage - 1) * itemsPerPage);
            setDisplayedWebsites(websites.slice(startIndex, startIndex + itemsPerPage));
            setTotalPages(Math.ceil(websites.length / itemsPerPage));
        })
        .catch((error) => console.error(error));     
    }, [trigger]);


    // Properly display users when pages change
    useEffect(() => {
        setStartIndex((currentPage - 1) * itemsPerPage);
        console.log(`currentPage: ${currentPage}`)
        const websites = passObject[0]?.websites || [];
        setDisplayedWebsites(websites.slice(startIndex, startIndex + itemsPerPage));
        console.log(websites.slice(startIndex, startIndex + itemsPerPage))
        setTotalPages(Math.ceil(websites.length / itemsPerPage))
    }, [startIndex, currentPage, passObject]);  

    // helper function that sets the settings for randomly generated password
    const settingsChange = (event) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [event.target.name]: event.target.checked
        }))
    }

    // helper function that handles length changes in randomly generated password
    const handleLengthChange = (event) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [event.target.name]: event.target.value
        }))
    }

    // adds a new password to server
    const addPassword = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5001/password', {
            owner: currentUser,
            website: {
                name: website
            },
            username: username,
            password: password
        })
        .then(() => {
            setTrigger((prev) => !prev);
        })
        .catch((error) => console.error(error));    
    }

    // deletes password on server
    const deletePassword = (value) => {
        axios.delete(`http://localhost:5001/password/${currentUser}/${value}`)
        .then((data) => {
            // console.log(data);
            setTrigger((prev) => !prev);
        })
        .catch((error) => {
            console.error(error);
        })
        
    }

    // calls and sets randomly generated password with requested settings
    const generatePassword = (event) => {
        event.preventDefault();
        const newPass = PasswordGenerator(settings)
        setPassword(newPass);
    }

    // handles changes to when user edits password details
    const ChangeEditData = (target_id) => {
        setEditBoxData(passObject[0]['websites'].find((item) => item._id === target_id));
    }

    // updates password details on server
    const editDetails = (event) => {
        event.preventDefault();
        axios.patch(`http://localhost:5001/password/${currentUser}/${editBoxData._id}`, {
            website: {name: editBoxData.website},
            username: editBoxData.username,
            password: editBoxData.password
        })
        .then((data) => {
            // console.log(data);
            setTrigger((prev) => !prev);
        })
        .catch((err) => console.error(err));

        
    }

    // helper function that updates input boxes
    const handleNewDetails = (event) => {
        setNewDetails({...newDetails, [event.target.name]: event.target.value});
        setEditBoxData({...editBoxData, [event.target.name]: event.target.value});
    };
    
    // Clears user cookie and logs out user
    const handleLogout = (event) => {
        Cookies.remove('username');
        navigate('/login')
    }

    const changeForm = (event) => {
        setFormStatus(!formStatus)
    }

    // Cleares username, password, and website input boxes
    const clearForm = () => {
        setUsername('');
        setPassword('');
        setWebsite('');
    }

    // Handles changes in themes
    const handleThemeChange = () => {
        setThemeColors(prevColors => {
            const newColors = prevColors[0] === '#7E56C2'  // if dark mode
                ? lightMode // switch to light mode
                : darkMode; // switch to dark mode

            return newColors;
        });
    };

    // if api data is not fetched, showing loading screen
    if (passObject && !displayedWebsites) return <p>Loading...</p>;
    
    return (
        <div className="container" style={{color: themeColors[2]}} >
            <aside className='sidebar' style={{backgroundColor: themeColors[0], color: themeColors[3]}} >
                <div className="s_bar_box" >
                    <Link to="/" ><h2 className="s_bar_element">BitProtector</h2></Link>
                    <Link className="s_bar_element" to="/about " ><h3 id="aboutbutton" >About</h3> </Link>
                </div>
            </aside>


            <div className="main" style={{backgroundColor: themeColors[1]}}>
                <div id="onefr">
                    <button style={{backgroundColor: themeColors[0], color: themeColors[3]}} className="button" id="themebutton" onClick={handleThemeChange} >Change Theme</button>
                    <button style={{backgroundColor: themeColors[0], color: themeColors[3]}} className="button" id='logoutbutton' onClick={handleLogout}>Logout</button>

                    <h2 id="greeting" >Welcome {currentUser}!</h2>
                </div>
                
                
                <div id="threefr">
                    <div id="stuff">
                    <div className="new_button">
                            <button style={{backgroundColor: themeColors[0], color: themeColors[3]}} className="button" onClick={() => 
                            
                            {
                                clearForm();
                                addDialogRef?.current?.showModal();
                                
                            }
                        } >New</button>
                        </div>

                    </div>
                    
                    <div id="passwordtable">
                        <table className="passwordBoxes">
                                <tr>
                                    <th>Website</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    
                                </tr>
                                {displayedWebsites?.map((website) => (
                                    
                                    <tr id="passwordSmallBoxes" key={website._id}>
                                        <th>{website.name}</th>
                                        <th>{website.username}</th>
                                        <th>{website.password}</th>  
                                        <th>
                                            <button style={{backgroundColor: themeColors[0], color: themeColors[3]}} className="button" onClick={() => { ChangeEditData(website._id); editDialogRef?.current?.showModal(); }}>
                                                Edit
                                            </button>
                                        </th>
                                        <th>
                                            <button style={{backgroundColor: themeColors[0], color: themeColors[3]}} className="button" onClick={() => { deletePassword(website._id); }}>
                                                Delete
                                            </button>
                                        </th>
                                    </tr>
                                ))} 
                        
                        
                        </table>
                        
                        <dialog ref={editDialogRef} >
                            <div className="editbox" style={{backgroundColor: themeColors[0], color: themeColors[1]}}>
                                <form onSubmit={editDetails}>
                                    <h2 id="edittext" >Edit</h2>
                                    <h3>Website</h3>
                                    <input style={{backgroundColor: themeColors[5], color: themeColors[2]}} className="formbox" id='websitebox' name = "website" value={editBoxData ? editBoxData.name: ""} onChange={handleNewDetails} />
                                    <br></br>
                                    <h3>Username</h3>
                                    <input style={{backgroundColor: themeColors[5], color: themeColors[2]}} className="formbox" id='usernamebox' name="username" value={editBoxData ? editBoxData.username: ""} onChange={handleNewDetails} />
                                    <br></br>
                                    <h3>Password</h3>
                                    <input style={{backgroundColor: themeColors[5], color: themeColors[2]}}  className="formbox" id='passwordbox' name='password' value={editBoxData ? editBoxData.password: ""} onChange={handleNewDetails} />
                                    <br></br>
                                    <button style={{ backgroundColor: themeColors[0], border: `1px solid ${themeColors[3]}`, color: themeColors[3] }}  className="button" type="button" onClick={() => editDialogRef?.current?.close() }>Cancel</button>
                                    <button style={{ backgroundColor: themeColors[0], border: `1px solid ${themeColors[3]}`, color: themeColors[3] }} className="button" id="savebutton" type="submit" onClick={() => editDialogRef?.current?.close()}>Save Changes</button>
                                </form>
                            </div>
                        </dialog>

                        <dialog ref={addDialogRef}>
                            <div className="addbox" style={{backgroundColor: themeColors[0], color: themeColors[1]}} >
                                <form onSubmit={addPassword}>
                                    <h2 id="addpasswordtext">Add Password</h2>
                                    <input style={{backgroundColor: themeColors[5], color: themeColors[2]}} type="text" className="formbox"  placeholder="website" value={website} onChange={(event) => setWebsite(event.target.value)} />
                                    <br></br>
                                    <input style={{backgroundColor: themeColors[5], color: themeColors[2]}} type="text" className="formbox" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                                    <br></br>
                                    <input style={{backgroundColor: themeColors[5], color: themeColors[2]}} type="text" className="formbox" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                                    <button  onClick={generatePassword} ><img title="Generate Password" src="/reload.jpg" id="genpassbutton" ></img></button>
                                    <button style={{ backgroundColor: themeColors[0], border: `1px solid ${themeColors[3]}`, color: themeColors[3] }}  className="button"  type="button" id="passwordsettings" onClick={changeForm} >Change Settings</button>

                                    {formStatus && (<div id="settingsform" >
                                            <div>
                                        <input style={{color: themeColors[2]}} type="range" className="setting" id="length" name="length" min="0" max="20" value={settings.length} onChange={handleLengthChange} />
                                        <label id="lengthbox" for="length">length: {settings.length}</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" className="setting" id="small" name="includeSmall" checked={settings.includeSmall} onChange={settingsChange} />
                                            <label for="small">Include Small Characters</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" className="setting" id="caps" name="includeCapital" checked={settings.includeCapital} onChange={settingsChange} />
                                            <label for="caps">Include Capital Characters</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" className="setting" id="special" name="includeSpecial" checked={settings.includeSpecial} onChange={settingsChange} />
                                            <label for="special">Include Special Characters</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" className="setting" id="nums" name="includeNumbers" checked={settings.includeNumbers} onChange={settingsChange} />
                                            <label for="nums">Include Nums</label>
                                        </div>

                                    </div>)}



                                    <br></br>

                                    <button style={{ backgroundColor: themeColors[0], border: `1px solid ${themeColors[3]}`, color: themeColors[3] }} className="button" type="button" onClick={() => {addDialogRef?.current?.close(); } }>Cancel</button>
                                    <button style={{ backgroundColor: themeColors[0], border: `1px solid ${themeColors[3]}`, color: themeColors[3] }} className="button" id="submitbutton" type="submit" onClick={() => addDialogRef?.current?.close()} >Submit</button>
                                
                                </form>
                            </div>
                        </dialog> 
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                        Prev
                            </button>
                            <span> Page {currentPage} of {totalPages} </span>
                            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
    
}


export default Sidebar;
