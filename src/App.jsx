import './App.css'
import Sidebar  from './sidebar'
import Register from './Register'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register /> } />
          <Route path='/' element={<Sidebar />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
