import React, { useState, useRef, useEffect } from "react";
import "./taskManager.css";
import Task from "./Task";
const TaskManager = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isediting,setIsEditing] = useState(false);
  const [taskid,setTaskId] = useState(null)

  const nameInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !date || !name || !date) {
      alert("please enter name and task ");
    } else if(name && date && isediting){
      const editedTask = tasks.map((item)=>{
        if(item.id===taskid){
          return {...item,name,date,completed:false}
        }
        return item
      })
      setTasks(editedTask)
      setName('')
      setDate('')
      setIsEditing(false)
      setTaskId(null)
    }else {
      const newTask = {
        id: Date.now(),
        name,
        date,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setName("");
      setDate("");
    }
  };
  const editTask =(id)=>{
    const thisTask = tasks.find((item)=>item.id===id)
    setTaskId(id)
    setIsEditing(true)
    setName(thisTask.name)
    setDate(thisTask.date)
  }
  const handleDelete = (id) => {
    if(window.confirm('Delete This Task')===true){
      const tasksAfterDeleted = tasks.filter((item) => item.id !== id);
    setTasks(tasksAfterDeleted);
    }
    
  };
  const handleComplete = (id)=>{
   setTasks(tasks.map((item)=>{
    if(item.id===id){
      console.log(item.completed)
      return {...item,completed:!item.completed}
    }
    return item
   })) 
  }
  useEffect(() => {
    
    nameInputRef.current.focus();
  });

  return (
    <>
      <div className="--bg-primary">
        <h1 className="--text-light --text-center">Task Manager</h1>
        <div className="--flex-center --p">
          <div className="--card --bg-light --width-500px --p --flex-center">
            <form className="form --form-control" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Task:</label>
                <input
                  ref={nameInputRef}
                  type="text"
                  placeholder="Task Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button type="submit" className="--btn --btn-success --btn-block">
                {isediting? 'Edit Task':'Save Task'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <article className="--flex-center --my2">
        <div className="--width-500px --p">
          <h2 className="--text-light">Task List</h2>
          <hr style={{ background: "#fff" }} />
          {tasks.length === 0 ? (
            <p className="--text-light">No Task added</p>
          ) : (
            <>
              {tasks.map((task) => {
                {/* first way  */}
                {/* const { id, name, date, completed } = task; */}
                {/* return (
                  <Task
                    key={id}
                    id={id}
                    name={name}
                    date={date}
                    completed={completed}
                    handleDelete={handleDelete}
                  />
              
                ); */}
                {/* second way  */}
                return <Task key={task.id} {...task} handleDelete={handleDelete} handleComplete={handleComplete} editTask={editTask}/>
              })}
            </>
          )}
        </div>
      </article>
    </>
  );
};

export default TaskManager;
