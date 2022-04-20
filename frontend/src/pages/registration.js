import React, {useState} from "react";
import APIService from "../components/APIService";
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [userName, setUserName] = useState("")
    const navigate = useNavigate()

    const register = () => {
        if(password===confirm) {
            APIService.CallFetch('register', 'POST', {email, password, userName})
                .then((r) => {
                    if(r.success) {
                        navigate('/Medications')
                    }
                })
                .catch((e) => console.log(e))
        }
    }
    return (
        <div className="regDiv">
            <label className="regEmailLabel">Email:</label>
            <input id="email" name="email" placeholder="Email@email.com"  value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label className="userName">Username:</label>
            <input id="userName" name="userName" placeholder="User Name" value={userName} onChange={(u) => setUserName(u.target.value)} />
            <br />
            <label className="regPassLabel">Password:</label>
            <input id="password" name="password" placeholder="Password" value={password} onChange={(p) => setPassword(p.target.value)} />
            <br />
            <input className="confirm" id="confirm" name="confirm" placeholder="Confirm Password" value={confirm} onChange={(c) => setConfirm(c.target.value)} />
            <br />
            <button className="regButton" onClick={register}>Sign Up</button>
        </div>
    )
}
export default Registration