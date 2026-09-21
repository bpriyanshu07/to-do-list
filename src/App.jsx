import { useState ,useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const[showFinished , setshowFinished] =  useState(true)

  const saveToLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  useEffect (() => {
      let todos = JSON.parse(localStorage.getItem("todos") || "[]")
      setTodos(todos)
      
    }, [])


  
  const handleEdit = (e,id)=>{
    let t = todos.filter(item => item.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleChange = (e)=>{
    
    setTodo(e.target.value)
  }

  const handleDelete = (id)=>{
    let newTodos = todos.filter(item =>{
      return item.id != id
    })
    setTodos(newTodos)
    saveToLS()
  }

  

  const handleAdd = () =>{
    // if(todo.length<3) return
    setTodos([...todos,{id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos =  [...todos];
    newTodos[index].isCompleted= !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }
  
  return (
    <>
      <Navbar />
      <div className="bg-violet-200 md:container   mx-auto my-1.5  rounded-xl p-6 min-h-[70vh] md:w-1/2 ">
        <h1 className="font-bold text-center text-xl m-4">iTask- Manage your todos at one place</h1>
        <div className="addTodo flex flex-col gap-4 my-5">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white w-full rounded-lg py-1 px-1.5"
          />
          <button
            onClick={handleAdd}
            disabled= {todo.length<3}
            className=" w-full text-white text-md font-bold bg-violet-800 hover:bg-violet-900 disabled:bg-violet-950 px-1.5 py-0.5 rounded-md"
          >
            Save
          </button>
        </div>
        <input onClick={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h1 className="text-xl font-bold my-2 ">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && <div>No todos to Display</div>  }
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex md:w-3/4 my-3 mx-5 justify-between "
                >
                  <div className="flex">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className=" text-white text-md font-bold bg-violet-800 hover:bg-violet-900  px-2 py-0.5 rounded-md mx-5"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className=" text-white text-md font-bold bg-violet-800 hover:bg-violet-900  px-2 py-0.5 rounded-md mx-5"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App
