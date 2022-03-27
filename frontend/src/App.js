import React from 'react';
import Main from './components/Main'
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages';
import About from './pages/about';
import Blogs from './pages/blogs';

function App() {
  return (
      <Router>
      <NavBar />
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path='/blogs' element={<Blogs/>} />
      </Routes>
      </Router>
  );
  }
    
export default App;