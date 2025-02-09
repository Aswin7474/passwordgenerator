import './App.css'
import Sidebar  from './sidebar'
import Register from './Register'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register /> } />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Sidebar />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
