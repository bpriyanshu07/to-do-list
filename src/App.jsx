import { useState } from 'react'
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const handleEdit = ()=>{

  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  
  const handleDelete = ()=>{

  }

  const handleAdd = () =>{
    setTodos([...todos,{todo, isCompleted: false}])
    setTodo("")
    console.log(todos)
  }
  return (
    <>
      <Navbar />
      <div className="bg-violet-200 container mx-auto my-1.5  rounded-xl p-2 min-h-[70vh] ">
        <div className="addTodo">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white w-80 px-1.5"
          />
          <button
            onClick={handleAdd}
            className=" text-white text-md font-bold bg-violet-800 hover:bg-violet-900  px-2 py-0.5 rounded-md mx-5"
          >
            Add
          </button>
        </div>
        <h1 className="text-xl font-bold my-2 ">Your Todos</h1>
        <div className="todos">
          {todos.map((item) => {
            return (
              <div className="todo flex">
                <div className={item.isCompleted ? "" : "line-through"}>
                  {item.todo}
                </div>
                <div className="buttons">
                  <button
                    onClick={handleEdit}
                    className=" text-white text-md font-bold bg-violet-800 hover:bg-violet-900  px-2 py-0.5 rounded-md mx-5"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className=" text-white text-md font-bold bg-violet-800 hover:bg-violet-900  px-2 py-0.5 rounded-md mx-5"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App
