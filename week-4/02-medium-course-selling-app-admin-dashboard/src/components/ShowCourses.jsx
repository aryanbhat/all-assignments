import React, { useState,useEffect } from "react";
import axios from "axios";
import "./style/style.css"
import {Link, Route, useNavigate} from "react-router-dom";
import Appbar from "./Appbar";
import { Card, CardActions, CardContent, CardMedia,Typography,Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faPlus } from "@fortawesome/free-solid-svg-icons";
function ShowCourses() {
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
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
        localStorage.setItem('username',JSON.stringify(data.username.username.split('@')[0]));
    }
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return (
        <>
        <Appbar isLoggedIn={true} username={username.split("@")[0]}></Appbar>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography variant="h3" style={{textAlign:"center",marginTop:"3%",fontWeight:"600",color:"#0d47a1"}}>Courses</Typography>
        <Button sx={{marginTop:"1.5%"}} onClick={(e)=> {navigate('/createCourse')}} variant="contained" startIcon={<FontAwesomeIcon icon={faPlus} /> }>Add Course</Button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",width:"80%",margin:"auto",gridGap:"8%",marginTop:"3%"}}>
        {courses.map(c => <Course title={c.title} description={c.description} price={c.price} imgLink={c.imageLink} key={c.id} id={c.id} />)}
        </div>
    </>)
}

export function Course(props) {
    const navigate = useNavigate();
    return(
        <> 
    <Card raised="true" style={{minHeight:"60vh"}}>
    <CardMedia  
    height={200}
    component="img"
        sx={{objectFit: "cover"}}
    image={props.imgLink} />
    <CardContent >
        <Typography sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}} variant="h5" align="center" style={{fontWeight:"600"}}>{props.title}</Typography>
        <Typography sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}}   variant="h6" align="center">{props.description}</Typography>
        <Typography  sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}} variant="h6" align="center" style={{fontWeight:"800"}}>Rs.{props.price}</Typography>
        <Button variant="contained" onClick={(e)=>{navigate(`/courses/${props.id}`)}}  startIcon={<FontAwesomeIcon icon={faPenToSquare} />} sx={{width:"100%",marginBottom:"4%"}}>Edit</Button>
    </CardContent>
        </Card>
    </>
    )
}

export default ShowCourses;