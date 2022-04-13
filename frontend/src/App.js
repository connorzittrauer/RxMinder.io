import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Medications from './pages/Medications';
import About from './pages/about';
import Interactions from './pages/Interactions'
import Home from './pages/home'
import TimeMonitorProvider from './providers/TimeMonitorProvider';

function App() {
  return (
      <Router>
      <NavBar />
      <TimeMonitorProvider>
        <Routes>
            <Route exact path='/' element={ <Home />} />
            <Route path='/medications' element={<Medications />} />
            <Route path='/about' element={<About />} />
            <Route path='/interactions' element={<Interactions/>} />
        </Routes>
      </TimeMonitorProvider>
      </Router>
  );
  }
    
export default App;