import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [todos, setTodos] = useState([])
    // fetch all todos from server
  useEffect(()=>{
    axios.get("http://localhost:3000/todos").then((res)=>{
      setTodos(res.data);
    })
  })
  const [title,setTitle] = useState('');
  const [description,setdescript] = useState('');
  function titlechange(e){
    setTitle(e.target.value);
  }
  function descriptchange(e){
    setdescript(e.target.value);
  }

  function submit(e){
    if(title === '' || description===''){
      
    }
    else{
    axios.post("http://localhost:3000/todos",{
      title:title,
      description:description
    }).then((res)=>{
      console.log(res.data);
    })
    // axios.get("http://localhost:3000/todos").then((res)=>{
    //   setTodos(res.data);
    // })
   } 
  }
  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        <form>
        <input type="text" className="input-title" name='title' placeholder='Enter the title' onChange={titlechange} required={true}/>
        <input type="text" className="input-desc" name='desciption' placeholder='Enter the description' onChange={descriptchange} required={true}/>
        <input type='submit' className='submitBtn' onClick={submit} />
        </form>
      </div>
      <div className='main'>
        {todos.map((todo)=>{
          return <Todo title={todo.title} description={todo.description} key={todo.id} id={todo.id}></Todo>
        })}
      </div>
    </>
  )
}
  
  
function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    return <div>
       <h1> {props.title} </h1>
        <h3>{props.description}</h3>
        <button onClick={()=> axios.delete(`http://localhost:3000/todos/${props.id}`)}>Delete</button>
    </div>
}

export default App
