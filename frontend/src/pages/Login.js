import React, {useState} from "react";
import APIService from "../components/APIService";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const callLogin = () => {
        APIService.CallFetch('login', 'POST', {email, password})
        .then((r) => console.log(r))
        .catch((e) => console.log(e))
    }
    return (
        <div>
            <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input id="password" name="password" value={password} onChange={(p) => setPassword(p.target.value)} />
            <button onClick={callLogin} type='button'>Login</button>
        </div>
    )
}

export default Login