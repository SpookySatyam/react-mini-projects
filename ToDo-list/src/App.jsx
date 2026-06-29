import {useEffect, useState} from 'react';

function App(){
  const [todos, setTodos]=useState(()=>{
    const saved=localStorage.getItem("hell_todos");
    return saved?JSON.parse(saved):[  ]});
  const [inputValue, setInput]=useState("");

  useEffect(()=>{
    localStorage.setItem("hell_todos", JSON.stringify(todos))
  },[todos]);

  const addOn=(e)=>{
    e.preventDefault();
    if(inputValue.trim()==0) return;

    const newInput={
      id:Date.now(),
      text:inputValue,
      completed:false
    }

    setTodos([newInput, ...todos]);
    setInput("");
  }

  const deleteTask=(toDelete)=>{
    setTodos(todos.filter(todo=>todo.id!==toDelete))
  }

  const done=(toDone)=>{
    setTodos(
      todos.map((todo)=>
        todo.id===toDone?{...todo, completed:!todo.completed}:todo
      )
    )
  }

  const pendingwork=todos.filter(todo=>!todo.completed).length;

  return(
    <>
    <h1>ToDo list-Hell work assignment</h1>
    <div className='container'>
      <form onSubmit={addOn}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Enter new pushiment..."/>
        <button onClick={addOn}>Add</button>
      </form>

      <h3>{pendingwork===0?"All torments cleared...for now":`Remaining punishments: ${pendingwork}`}</h3>
      
      <div className='todo-list'>
        {todos.map((todo)=>(
          <div  key={todo.id} className='tasks'>
            <h2>{todo.text} - <span style={{color: todo.completed?"lightgreen":"red"}}>
                                {todo.completed?"Done":"Pending"}</span></h2>
            <div>
            <button onClick={()=>deleteTask(todo.id)}>Remove</button>
            <button onClick={()=>done(todo.id)}>{todo.completed?"Undo":"Done"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
export default App;