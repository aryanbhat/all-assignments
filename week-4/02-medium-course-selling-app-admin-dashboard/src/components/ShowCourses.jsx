import React, { useState,useEffect } from "react";
import axios from "axios";
import "./style/style.css"
import {Link, Route, useNavigate} from "react-router-dom";
function ShowCourses() {
    const [username,setUsername] = useState("");
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        axios.get("http://localhost:3000/admin/courses/",{
            headers:
            {
                Authorization: `Bearer ${access_token}`
            }
        }).then((res)=>{
            callback(res.data);
            
        }).catch((err)=>{
            console.log(err);
        })
    })

    function callback(data){
        setCourses(data.courses);
        setUsername(data.username.username);
    }
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div className="showCourses">
    <div className="navbar">
        <h1>Course Page</h1>
        <button onClick={()=> navigate("/createCourse")}>add course</button>
        <h3>{username}</h3>
        </div>
        <div className="CourseList">
        {courses.map(c => <Course title={c.title} description={c.description} price={c.price} imgLink={c.imageLink} key={c.id} id={c.id} />)}
        </div>
    </div>
}

function Course(props) {
    return <div className="CourseCard">
        <h4><img className="CourseImg" src={props.imgLink} /></h4>
        <h1 className="CourseTitle">{props.title}</h1>
        <h3 className="CourseDescription">{props.description}</h3>
        <h4 className="CoursePrice">Rs.{props.price}</h4>
        <Link to={`/courses/${props.id}`}>Edit </Link>
    </div>
}

export default ShowCourses;