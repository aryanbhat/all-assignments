import React, { useState,useEffect } from "react";
import axios from "axios";
import "./style/style.css"
import {Route, useNavigate} from "react-router-dom";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [price,setPrice] = useState("");
    const [imageLink,setImg] = useState("");
    const [published,setpublished] = useState(false);
    function handleTrue(e){
        if(e.target.checked){
            setpublished(true);
        }
    }
    function handleFalse(e){
        if(e.target.checked){
            setpublished(false);
        }
    }
    function handleBtn(e){
        const access_token =  JSON.parse( localStorage.getItem("access_token"));
        axios.post("http://localhost:3000/admin/courses",{
            title:title,
            description:desc,
            price:price,
            imageLink:imageLink,
            published:published
        },{
           headers:
            {
                Authorization: `Bearer ${access_token}`
            }
        }).then((res)=>{
            alert(res.data.message);
            navigate("/courses");
        })
        .catch((err)=>{
            alert(err);
        })
    }
    return <div className="courseForm">
        <h1>Create Course Page</h1>
        <div>
            <h3>Title</h3>
            <input type={"text"} onChange={e => setTitle(e.target.value)} placeholder="Enter the title" />
        </div>
        <div>
            <h3>Description</h3>
        <input type={"text"} onChange={e => setDesc(e.target.value)} placeholder="Enter the description" />
        </div>
        <div>
            <h3>Price</h3>
            <input type={"number"} onChange={e => setPrice(e.target.value)} placeholder="1000"/>
        </div>
        <div>
            <h3>Image</h3>
            <input type={"url"} onChange={e => setImg(e.target.value)}  placeholder="eg.https://1234.com"/>
        </div>
        <div>
            <h3>Published</h3>
            <input type={"checkbox"} onChange={handleTrue} defaultChecked={false}/>
            True
            <input type={"checkbox"} onChange={handleFalse} defaultChecked={true}/>
            False
        </div>
        <button onClick={handleBtn}>Create Course</button>
    </div>
}
export default CreateCourse;