import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Medications from './pages/medications';
import Home from './pages';
import About from './pages/about';
import Interactions from './pages/interactions';

function App() {
  return (
      <Router>
      <NavBar />
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/medications' element={<Medications />} />
          <Route path='/about' element={<About/>} />
          <Route path='/interactions' element={<Interactions/>} />
      </Routes>
      </Router>
  );
  }
    
export default App;