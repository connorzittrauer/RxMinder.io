import React, {useState} from "react";
import APIService from "../components/APIService";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
  
    const callLogin = () => {
        APIService.CallFetch('login', 'POST', {email, password})
        .then((r) => {
            if(r.success) {
                props.setLogin(r)
                //if successful, set the global login variable equal to the current user ID
  
            }
         })
        .catch((e) => console.log(e))

    }

    return (
        <div className="loginDiv">
            <br />
            <label className="label1">Email:</label>
            <input id="email" name="email" placeholder="Email@email.com"  value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />
            <label className="label2">Password:</label>
            <input id="password" name="password" placeholder="Password" value={password} onChange={(p) => setPassword(p.target.value)} />
            <br />
            <br />
            <button className="loginButton" onClick={() => {
                callLogin()
   
            }}type='button'>Login</button>
            <br />
            <br />
            <a href="/registration">Create Account</a>
    
        </div>
    )
}

export default Login