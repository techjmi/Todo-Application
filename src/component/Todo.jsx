import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from 'react-toastify';
import "../App.css"

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  //save in local storage
  const saveToLS=()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  },[])
  const handleEdit = (e,id) => {
    let Edittodo=todos.filter(i=>i.id===id)
    setTodo(Edittodo[0].todo)
    const newTodos = todos.filter((item) => item.id!== id);
    // newTodos.splice(id, 1);
    setTodos(newTodos);
    saveToLS()
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLS();
      toast.success("Item Deleted Successfully");
    }
  };
  
  const handleAdd = () => {
    setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }]);
    setTodo("");
    saveToLS()
    
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setTodo(value);
    // console.log(value);
  };
  const handleCheckBox= (e) => {
    let id= e.target.name
    // console.log("the id is", id)
    let index = todos.findIndex(item=>{
        return item.id === id;
      }) 
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos)
      saveToLS()
  }
  
  return (
    <>
      <div className="container mx-auto mt-2 bg-violet-100 rounded-xl p-3 w-4/5 min-h-[88vh]">
        <div className="todo md:w-1/2 mx-auto">
          <h1 className="md:w-1/2 mx-auto text-xl font-bold mb-3">Your To do App</h1>
          <input
          placeholder="New task goes here..."
            onChange={handleChange}
            type="text"
            value={todo}
            className="flex-1 w-4/5 mb-5 py-2 ps-2 rounded-lg "

          />
          <button
            onClick={handleAdd} disabled={todo.length<=1}
            className="bg-violet-900 hover:bg-violet-950 rounded-md text-sm font-bold p-3 py-2.5 text-cyan-50 md:mx-5 disabled:bg-gray-500"
          >
            Add
          </button>
        </div>
      <div className="show md:w-1/2 mx-auto">
      <input className="text-2xl" onChange={toggleFinished} type="checkbox" checked={showFinished} name=""id="" /> <span>Show Finished</span>
        <h2 className="font-bold text-lg mt-1">Your To Do's</h2>
      </div>
       
        <div className="todos overflow-auto scrollbar-none max-h-[50vh]">
          <div className="todo overflow-auto scrollbar-none">
            {todos.length===0&& <div className="md:w-1/2 mx-auto text-Dark-gray font-bold">Nothing To Display! Add Your First Item</div>}
            {todos.map((item) => (showFinished||!item.isCompleted)&&(
              <div key={item.id} className="flex md:w-1/2 justify-between mt-1 mx-auto">
                <div className="flex gap-5">
                <input onChange={handleCheckBox} type="checkbox" checked={todo.isCompleted} name={item.id}id="" />
                <p className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </p>
                </div>
              
                <div className="button flex h-full">
                  <button
                    className="bg-violet-900 hover:bg-violet-950 rounded-md text-sm font-bold p-2 py-1 text-cyan-50 mx-5"
                    onClick={(e)=>handleEdit(e ,item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-violet-900 hover:bg-violet-950 rounded-md text-sm font-bold p-2 py-1 text-cyan-50 mx-5"
                    onClick={()=>handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
