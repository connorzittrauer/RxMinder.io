import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Medications from './pages/Medications';
import Home from './pages';
import About from './pages/about';
import Interactions from './pages/Interactions';
import Login from './pages/Login';
import Registration from './pages/registration';

function App() {
    const [isLogin, setIsLogin] = useState(false)
    const [userId, setUserId] = useState(null)
    const loginHandler = (r) => {
      setIsLogin(r.success)
      setUserId(r.id)
    }

  return (
      <Router>
      <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/Medications' element={isLogin ? <Medications userId={userId} /> : <Login setLogin={(r) => loginHandler(r)} />} />
          <Route path='/About' element={<About/>} />
          <Route path='/Interactions' element={isLogin ? <Interactions userId={userId} /> : <Login setLogin={(r) => loginHandler(r)} />} />
        </Routes>
      </Router>
  );
  }

    
export default App;