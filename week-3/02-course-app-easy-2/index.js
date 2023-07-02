const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
const secretKeyAdmin = "7a45eb1ce8afd0dfcb04646383ff33a268b58e94681982fba8a6ddfad9da5da17b7bf605c9cc2047396217080a735907cf81d1e8352b6bb6de62e81b98bf8eab";
const secretKeyUser = "5d50b4723d35599f5df1ba7ffefc7df7d292d6fbf95fcaeed51e21ed337b106537213561afd34a19cbf828803be20bf719445cb0e43ba53314b910897b67729e";


function generateTokenAdmin(user){
  return jwt.sign(user.username, secretKeyAdmin , {});
}


// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const user = req.body;
  for(let admin of ADMINS) {
    if(admin.username === user.username){
      res.status(401).send("Admin already exists!");
    }
  }
  ADMINS.push(user);
  const token = generateTokenAdmin(user);
  res.json({'message':'Admin created successfully',token});
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
