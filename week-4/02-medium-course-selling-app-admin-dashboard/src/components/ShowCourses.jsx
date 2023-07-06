import React, { useEffect,useState } from "react";
import axios from "axios";
import "./style/style.css"
import { Route, useNavigate } from "react-router-dom";

function ShowCourses() {
    const [courses, setCourses] = useState([]);
    useEffect(()=>{
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        axios.get("http://localhost:3000/admin/courses/",{
            headers:
            {
                Authorization: `Bearer ${access_token}`
            }
        }).then((res)=>{
            setCourses(res.data.courses);
        }).catch((err)=>{
            console.log(err);
        })
    })
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div>
        <h1>Course Page</h1>
        {courses.map(c => <Course title={c.title} description={c.description} price={c.price} imgLink={c.imageLink} key={c.id} />)}
    </div>
}

function Course(props) {
    return <div>
        <h1>{props.title}</h1>
        <h3>{props.description}</h3>
        <h4>{props.price}</h4>
        <h4><img src={props.imgLink} /></h4>
    </div>
}

export default ShowCourses;