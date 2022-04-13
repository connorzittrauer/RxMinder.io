import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Medications from './pages/Medications';
import Home from './pages';
import About from './pages/About';
import Interactions from './pages/Interactions';
import Login from './pages/Login';

function App() {
    const [isLogin, setIsLogin] = useState(false)

  return (
      <Router>
      <NavBar />
        {isLogin ?
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/Medications' element={<Medications />} />
          <Route path='/About' element={<About/>} />
          <Route path='/Interactions' element={<Interactions/>} />
        </Routes> : 
        <Login />}
      </Router>
  );
  }

    
export default App;