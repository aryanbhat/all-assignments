import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import "./style/style.css"
import Appbar from "./Appbar"
import { Typography,Card,CardContent, TextField,FormGroup,FormControlLabel,Button,Checkbox, CircularProgress} from "@mui/material";

function EditCourse(){
  const navigate = useNavigate();
  let {id} = useParams();
  id = parseInt(id);
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [price,setPrice] =  useState(null);
  const [img,setImg] = useState("");
  useEffect(()=>{
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    axios.get(`http://localhost:3000/admin/courses/${id}`,{
      headers:
      {
        Authorization: `Bearer ${access_token}`
      }
    }).then((res)=>{
      setTitle(res.data.title);
      setDesc(res.data.description);
      setPrice(res.data.price);
      setImg(res.data.imageLink);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  function handleClick(e){
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    axios.put(`http://localhost:3000/admin/courses/${id}`,{
      "title":title,
      "description":desc,
      "price":price,
      "imageLink":img
    },{
      headers:{
        Authorization : `Bearer ${access_token}`
      }
    }).then((res)=>{
        navigate('/courses');

    }).catch((err)=>{
      alert(err);
    })
  }

  return (
    <>
    <Appbar isLoggedIn={true} username={JSON.parse(localStorage.getItem('username'))}></Appbar>

    <div style={{marginTop:"3%",display:"flex"}}>

      <CourseCard title={title} description={desc} price={price} imageLink={img} />

      <Card raised={true} sx={{width:"40%",margin:"auto"}}>
    <CardContent style={{display:"flex",flexDirection:"column",alignItems:"center",paddinh:"6%"}}>
            <TextField onChange={(e)=>{setTitle(e.target.value)}} sx={{marginTop:"2%"}} fullWidth type="text" gutterBottom variant="standard" label="Title" placeholder={title} autoComplete="off"></TextField>
            <TextField onChange={(e)=>{setDesc(e.target.value)}} sx={{marginTop:"2%"}} type="text" fullWidth multiline gutterBottom variant="standard" label="Description" placeholder={desc} autoComplete="off"></TextField>
            <TextField onChange={(e)=>{setPrice(e.target.value)}} sx={{marginTop:"2%"}}  type="number" fullWidth
            gutterBottom variant="standard" autoComplete="off" placeholder={price} label="Price" ></TextField>
            <TextField onChange={(e)=>{setImg(e.target.value)}} sx={{marginTop:"2%"}} type="url" fullWidth
            gutterBottom variant="standard" autoComplete="off" placeholder={img} label="Image" ></TextField>
        <Button sx={{marginTop:"3%"}} variant="contained" onClick={handleClick}>Update Course</Button>
        </CardContent>
        </Card>
      </div>
    </>
  )
 }



// function UpdateCard(props){
//   return(
//     <>
//           <Card raised={true} sx={{width:"40%",margin:"auto"}}>
//     <CardContent style={{display:"flex",flexDirection:"column",alignItems:"center",paddinh:"6%"}}>
//             <TextField onChange={(e)=>{setTitle(e.target.value)}} sx={{marginTop:"2%"}} fullWidth type="text" gutterBottom variant="standard" label="Title" placeholder={props.title} autoComplete="off"></TextField>
//             <TextField  sx={{marginTop:"2%"}} type="text" fullWidth multiline gutterBottom variant="standard" label="Description" placeholder={props.description} autoComplete="off"></TextField>
//             <TextField  sx={{marginTop:"2%"}}  type="number" fullWidth
//             gutterBottom variant="standard" autoComplete="off" placeholder={props.price} label="Price" ></TextField>
//             <TextField sx={{marginTop:"2%"}} type="url" fullWidth
//             gutterBottom variant="standard" autoComplete="off" placeholder={props.imageLink} label="Image" ></TextField>
//         <Button sx={{marginTop:"3%"}} variant="contained">Update Course</Button>
//         </CardContent>
//         </Card>
//     </>
//   )
// }

function CourseCard(props){
  return(
    <> 
<Card raised="true" style={{minHeight:"60vh",overflow:"hidden",width:"30%",margin:"auto"}}>
<CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center",padding:"0"}}>
    <img src={props.imageLink} alt="" style={{width:"100%",margin:"auto",objectFit:"cover",marginBottom:"6%"}}/>
    <Typography gutterBottom sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}} variant="h5" align="center" style={{fontWeight:"600"}}>{props.title}</Typography>
    <Typography gutterBottom sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}}   variant="h6" align="center">{props.description}</Typography>
    <Typography gutterBottom sx={{fontFamily:"Poppins,sans-serif",marginBottom:"4%"}} variant="h6" align="center" style={{fontWeight:"800"}}>Rs.{props.price}</Typography>
</CardContent>
    </Card>
</>
)




}

export default EditCourse;  