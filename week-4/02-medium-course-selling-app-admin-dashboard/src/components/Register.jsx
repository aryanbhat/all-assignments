import React, { useEffect } from "react";
import axios from "axios";
import "./style/style.css"
import { Route, useNavigate } from "react-router-dom";
/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password,setPass] = React.useState("");
    function Handleclick(e){
        if(email === '' || password === ''){
            alert("enter valid username and password");
        }
        else{
        axios.post("http://localhost:3000/admin/signup",{
            username: email,
            password:password
        }).then((res)=>{
            console.log(res.data);
            navigate('/login');
        }).catch((err)=>{
            alert(err.code);
        })
    }
    }
    return <div className="signupForm">
        <h1>Register to the website</h1>
        <div className="signupFormInput">
        <h3>username</h3>
        <input type={"email"} onChange={e => setEmail(e.target.value)} required/>
        <h3>password</h3>
        <input type={"text"} onChange={e => setPass(e.target.value)} required/>
        <input type={"submit"} onClick={Handleclick} className="signupBtn" />
        Already a user? <a href="/login">Login</a>
        </div>
    </div>
}

export default Register;