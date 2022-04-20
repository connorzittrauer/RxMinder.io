import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Medications from './pages/medications';
import About from './pages/about';
import Interactions from './pages/interactions';
import Home from './pages/home';
import TimeMonitorProvider from './providers/TimeMonitorProvider';
import Login from './pages/login';
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
      <TimeMonitorProvider>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/medications' element={isLogin ? <Medications userId={userId} /> : <Login setLogin={(r) => loginHandler(r)} />} />
          <Route path='/about' element={<About/>} />
          <Route path='/interactions' element={isLogin ? <Interactions userId={userId} /> : <Login setLogin={(r) => loginHandler(r)} />} />
        </Routes>
      </TimeMonitorProvider>
      </Router>
  );
  }

    
export default App;