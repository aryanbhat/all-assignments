import express from 'express'
import jwt from "jsonwebtoken"
import cors from "cors"
import fs from "fs"
const app = express();
app.use(express.json());
app.use(cors());

let ADMINS = [];
let USERS = [];
let COURSES = [];
const port =  process.env.PORT || 3000;
// Read data from file, or initialize to empty array if file does not exist
try {
    ADMINS = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
    USERS = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    COURSES = JSON.parse(fs.readFileSync('courses.json', 'utf8'));
} catch {
    ADMINS = [];
    USERS = [];
    COURSES = [];
}
console.log(ADMINS);

const SECRET = 'e6e1ed755963a7724b8b1c16c6a18f66c51f1c9cf02d240ea28fae6da1969d96a9c11d91f63750a32afe463ad968ee747553447b018b655e7bbe6279998fa299';

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Admin routes
app.post('/admin/signup', (req, res) => {
  const { username, password } = req.body;
  const admin = ADMINS.find(a => a.username === username);
  if (admin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    const newAdmin = { username, password };
    ADMINS.push(newAdmin);
    fs.writeFileSync('admins.json', JSON.stringify(ADMINS));
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
  }
});

app.get('/',(req,res)=>{
  res.json({"message":"App deployed successfully","courses":ADMINS});
})

app.get('/admin/courses/:id',authenticateJwt,(req,res) => {
  const id = parseInt(req.params.id);
  let newCourse = {};
  for(let course of COURSES){
    if(course.id === id){
      newCourse = course;
      res.status(201).json(newCourse);
      break;
    }
  }
  res.status(401).send("No courses found");
})

app.post('/admin/login', (req, res) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(a => a.username === username && a.password === password);
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post('/admin/courses', authenticateJwt, (req, res) => {
  const course = req.body;
  course.id = COURSES.length + 1;
  COURSES.push(course);
  fs.writeFileSync('courses.json', JSON.stringify(COURSES));
  res.json({ message: 'Course created successfully', courseId: course.id , "username":req.user});
});

app.put('/admin/courses/:courseId', authenticateJwt, (req, res) => {
  const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
  if (course) {
    Object.assign(course, req.body);
    fs.writeFileSync('courses.json', JSON.stringify(COURSES));
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.delete('/admin/courses/:courseId', authenticateJwt, (req,res) => {
  const ID = parseInt(req.params.courseId);
  const newCourse = [];
  let check = false;
  for(let course of COURSES){
    if(course.id !== ID){
      newCourse.push(course);
      check = true;
    }
  } 
  if(check){
    fs.writeFileSync("courses.json",newCourse);
  res.send(newCourse);
  }
  else{
    res.send("No courses found");
  }
})
app.get('/admin/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES ,'username':req.user});
});

// User routes
app.post('/users/signup', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username);
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = { username, password };
    USERS.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(USERS));
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', (req, res) => {
  const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
  const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      fs.writeFileSync('users.json', JSON.stringify(USERS));
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(port, () => console.log('Server running on port 3000'));

export default app;