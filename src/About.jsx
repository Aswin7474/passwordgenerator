import './App.css'
import { Link } from "react-router-dom";

function About() {
    return (
        <div className="container">
            <aside className='sidebar'>
                <div className="s_bar_box">
                    <Link to="/" ><h2 className="s_bar_element">BitProtector</h2></Link>
                    <Link className="s_bar_element" to="/about " ><h3 id="aboutbutton" >About</h3> </Link>
                </div>
            </aside>


            <div className="main">
                <h1 id='title' >About</h1>
                <h2 id='abouttext' >BitProtector is a secure, easy-to-use password manager designed to simplify your online security. With BitProtector, you can store, generate, and manage all your passwords in one safe place.</h2> 
            </div>
        </div>
    )
}

export default About;
