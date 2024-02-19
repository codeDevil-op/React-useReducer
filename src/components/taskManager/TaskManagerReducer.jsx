import React, { useState, useRef, useEffect, useReducer } from "react";
import useLocalStorage from 'use-local-storage'
import "./taskManager.css";
import Task from "./Task";
import Alert from '../alert/Alert'
import Confirm from "../confirm/Confirm";
import { taskReducer } from "../reducer/TaskReducer";


const TaskManagerReducer = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tasks,setTasks] = useLocalStorage('tasks',[])

  // initial state 

  const initialState = {
    tasks,
    taskid:null,
    isediting:false,
    isAlertOpen:false,
    alertContent:'',
    alertClass:'danger',
    isEditModalOpen:false,
    isDeleteModalOpen:false,
    modalTitle:'',
    modalMsg:'',
    modalActionText:'',
  }
// use reducer 
  const [state,dispatch] = useReducer(taskReducer,initialState)
  
// handle form submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name ||!date){
        dispatch({
            type: 'EMPTY_FIELD'
        })
    } if(name && date && state.isediting){
      const updatedTask = {
        id:state.taskid,
        name,
        date,
        completed:false
      }
      dispatch({
        type:'UPDATE_TASK',
        payload:updatedTask
      })
      setName('');
      setDate('');
      setTasks(tasks.map((task)=>{
        if(task.id===updatedTask.id){
          return {...task,name,date,completed:false}
        }
        return task
      }))
      return;
      
    }
    if(name && date ){
       const newTask = {
        id:Date.now(),
        name,
        date,
        completed:false
       }
       dispatch({
        type:'ADD_TASK',
        payload:newTask,
       })
       setName('');
       setDate('');
       setTasks([...tasks,newTask])
    }
    
  };
  // open edit confirmation box 
  const openEditTaskModal = (id)=>{
    dispatch({
      type:'OPEN_EDIT_MODAL',
      payload:id
    })
  }
  const editTask =()=>{
    const id = state.taskid;
    dispatch({
      type:'EDIT_TASK',
      payload:id
    })
    const thisTask = state.tasks.find((task)=>task.id===id);
    setName(thisTask.name);
    setDate(thisTask.date);
    closeModal();
  }
// open delete confirmation box 
  const openDeleteTaskModal = (id)=>{
    dispatch({
      type:'OPEN_DELETE_MODAL',
      payload: id,
    })
  }
  const handleDelete = () => {
  const id = state.taskid
    dispatch({
      type:'DELETE_TASK',
      payload: id,
    })
    setTasks(tasks.filter((task)=>task.id!==id))
    
    closeModal();
  };
  // handle completetion of task 
  const handleComplete = (id)=>{
    dispatch({
      type:'COMPLETE_TASK',
      payload:id,
    })
    setTasks(tasks.map((task)=>{
      if(task.id===id){
        return {...task,completed:!task.completed}
      }
      return task
    }))
  }
  // close confirmation box 
 const closeModal = ()=>{
  dispatch({
    type:'CLOSE_MODAL'
  })
 }

//  focus on input on every render 
 const nameInputRef = useRef(null);
  useEffect(() => {
    nameInputRef.current.focus();
  });
  // close alert option 
  const closeAlert = ()=>{
    dispatch({
        type: 'CLOSE_ALERT'
    })
  }

  return (
    <>
      <div className="--bg-primary">
      {state.isAlertOpen && <Alert alertContent = {state.alertContent} alertClass = {state.alertClass} onCloseAlert={closeAlert}/>}
      {state.isEditModalOpen && <Confirm
        modalTitle={state.modalTitle}
        modalMsg={state.modalMsg}
        modalActionText={state.modalActionText}
        moadalAction={editTask}
        onCloseModal ={closeModal}
      />}
      {state.isDeleteModalOpen &&
      <Confirm 
        modalTitle={state.modalTitle}
        modalMsg={state.modalMsg}
        modalActionText={state.modalActionText}
        moadalAction={handleDelete}
        onCloseModal ={closeModal}
      />
      }
      {/* <Confirm/> */}
        <h1 className="--text-light --text-center">Task Manager Reducer</h1>
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
               {state.isediting? 'Edit Task':'Save Task'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <article className="--flex-center --my2">
        <div className="--width-500px --p">
          <h2 className="--text-light">Task List</h2>
          <hr style={{ background: "#fff" }} />
          {state.tasks.length === 0 ? (
            <p className="--text-light">No Task added</p>
          ) : (
            <>
              {state.tasks.map((task,index) => {
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
                return <Task key={index} {...task} 
                handleComplete={handleComplete} 
                editTask={openEditTaskModal}
                deleteTask ={openDeleteTaskModal}  
                />
              })}
            </>
          )}
        </div>
      </article>
    </>
  );
};

export default TaskManagerReducer;
