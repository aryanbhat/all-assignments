const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let courseId = 1;
// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const username = req.body.username;
  const password = req.body.password;
  let check = false;
  for(let user of ADMINS){
    if(user.username === username){
      check = true;
    }
  }
  if(!check){
  let newUser = {
    'username' : username,
    'password' : password
  }
  ADMINS.push(newUser);
  res.status(200).send("Admin created succesfully");
}
else{
  res.status(400).send("Account already exists");
}
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const username = req.headers.username;
  const password = req.headers.password;
  for(let user of ADMINS){
    if(user.username === username){
      if(user.password === password)
        res.status(200).send("Logged in successfully");
        else{
          res.status(400).send("Password does not match");
        }
    }
  }
  res.status(404).send("User does not exist");
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
    const username = req.headers.username;
    const password = req.headers.password;
    for(let user of ADMINS){
      if(user.username === username && user.password === password){
          const title = req.body.title;
          const description = req.body.description;
          const price = req.body.price;
          const imgLink = req.body.imgLink;
          let newCourse = {
            'title' : title,
            'description' : description,
            'price': price,
            'imgLink' : imgLink,
            'id' : courseId++
          }
          COURSES.push(newCourse);
          res.status(200).send("Course added successfully");
      }
    }
    res.status(404).send('User credential does not match');
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  const id = req.params.courseId;
  const username = req.headers.username;
  const password = req.headers.password;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imgLink = req.body.imgLink;
  let check = false;
  for(let admin of ADMINS){
  if(admin.username === username && admin.password === password){
  for(let course of COURSES){
    if(course.id == id){
        course.title = title;
        course.description = description;
        course.price = price;
        course.imgLink = imgLink;
        check = true;
        res.status(200).send("Course updated successfully");
     }
   }
   if(check === false){
    res.status(404).send('Course not found');
   }
 }
 else{
  res.status(404).send("User credential does not match");
 }
}
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  const username = req.headers.username;
  const password = req.headers.password;
  for(let admin of ADMINS){
    if(admin.username === username && admin.password === password){
      res.status(200).json(COURSES);
    }
  }
  res.status(400).send("Admin credentials dont match");
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const username = req.body.username;
  const password = req.body.password;
  for(let user of USERS){
    if(user.username === username){
        res.status(400).send("User already exists");
    }
  }
  let newUser = {
    'username':username,
    'password':password,
    'coursePurchased':[]
  }
  USERS.push(newUser);
  res.status(200).send("User registered successfully");
});

app.post('/users/login', (req, res) => {
  // logic to log in user
    const username = req.headers.username;
    const password = req.headers.password;
    for(let user of USERS){
      if(user.username === username && user.password === password){
        res.status(200).send("User logged in successfully");
      }
    }
    res.status(404).send("User not found");
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
  const username = req.headers.username;
  const password = req.headers.password;
  for(let user of USERS){
    if(user.username === username && user.password === password){
      res.send(COURSES);
    }
  }
  res.status(400).send("User not found");
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
  const id = req.params.courseId;
  const username = req.headers.username;
  const password = req.headers.password;
  for(let user of USERS){
    if(user.username === username && user.password === password){
      for(let course of COURSES){
        if(course.id == id){
          user.coursePurchased.push(course);
          res.send("Course purchased successfully");
        }
      }
      res.status(404).send("Course not found");
    }
  }
  res.status(404).send("User not found");
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
    const username = req.headers.username;
    const password = req.headers.password;
    for(let user of USERS){
      if(user.username === username && user.password === password){
        res.status(200).json(user.coursePurchased);
      }
    }
    res.status(404).send("User not found");
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
