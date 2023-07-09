import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import "./style/style.css"



function EditCourse(){
  const {id} = useParams();
  const Id = parseInt(id);
  const [title,setTitle] = useState("");
  const [description,setDesc] = useState("");
  const [price,setPrice] = useState(0);
  const [imageLink,setImg] = useState("");
  const [published,setPublish] = useState(false);
  useEffect(() => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    axios.get("http://localhost:3000/admin/courses",{
      headers:{
      Authorization:`Bearer ${access_token}`
      } 
    }).then((res)=>{
      callback(res.data);
    }).catch((err)=>{
      alert(err);
    })
  })

  function callback(data){
    let courseUse = {};
    for(let i=0;i<data.courses.length;i++){
      if(data.courses[i].id === Id){
        courseUse = data.courses[i];
      }
    }
    setTitle(courseUse.title);
    setDesc(courseUse.description);
    setPrice(courseUse.price);
    setImg(courseUse.imageLink);
    setPublish(courseUse.published);
  }

  function handleBtn(e){
    const data = {
      title:title,
      description:description,
      price:price,
      imageLink:imageLink,
      published:published
    }
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const config = {
      headers:
      {
        Authorization:`Bearer ${access_token}`
      }
    }
    console.log(data + access_token + config);
    axios.put(`http://localhost:3000/admin/courses/${id}`,data,config).then((res)=>{
      alert(res.data);
    }).catch((err)=>{
      alert(err);
    })
  }


  return (
  <div className="editCourseMain">
  <form className="editForm">
  <div className="formInput">
    <h3>Title</h3>
    <input type="text" defaultValue={title} onChange={(e)=> setTitle(e.target.value)} />
  </div>
  <div  className="formInput">
    <h3>Description</h3>
    <input type="text" defaultValue={description} onChange={(e)=> setDesc(e.target.value)}  />
    </div>
    <div className="formInput">
    <h3>Price</h3>
    <input type="number" defaultValue={price} onChange={(e)=> setPrice(e.target.value)} />
    </div>
    <div className="formInput">
    <h3>Image</h3>
    <input type="url" defaultValue={imageLink} onChange={(e)=> setImg(e.target.value)} />
    </div>
    <div className="formInput">
    <h3>Published</h3>
    <select onChange={(e)=> setPublish(e.target.options)}>
      <option>True</option>
      <option>False</option>
    </select>
    </div>
    <input type="submit" onClick={handleBtn}  />
  </form>
  </div>
  )
}


export default EditCourse;