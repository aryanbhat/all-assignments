import React, { useState } from "react";
import axios from "axios";
import "./style/style.css"
import { Route, useNavigate} from "react-router-dom";
/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password,setPass] = useState("");
    function handleBtn(){
        axios.post("http://localhost:3000/admin/login",{},{
            headers:{
                username: email,
                password: password
            }
        }).then((res)=>{
            console.log(res);
            localStorage.setItem(`access_token`,JSON.stringify(res.data.token));
            navigate("/courses");
        }).catch((err)=>{
            console.log("Credentials dont match")
        })
    }
    return <div className="signupForm">
        <h1>Login to admin dashboard</h1>
        <div className="signupFormInput">
        <h3>username</h3>
        <input type={"text"} onChange={e => setEmail(e.target.value)} required/>
        <h3>password</h3>
       <input type="password" onChange={e => setPass(e.target.value)} required/>
        <button onClick={handleBtn}>Login</button>
        New here? <a href="/register">Register</a>
        </div>
    </div>
}

export default Login;