import React from "react";
import './taskManager.css'
import { FaEdit, FaTrashAlt, FaCheckDouble } from "react-icons/fa";
import {TransitionGroup,CSSTransition} from 'react-transition-group';

const Task = ({handleComplete,editTask,deleteTask,task}) => {
  const {id, name, date,completed} = task
  return (
    <>
    
      <div  className={completed ? 'task complete': 'task'}>
        <span>
         <p>
          <b>Task:</b> {name}
         </p>
         <p>
          <b>Date:</b> {date}
         </p>
        </span>

        <span>
          <button disabled={completed} className={completed?'disabled':undefined} >
            <FaEdit color={completed? 'grey':'green'} onClick={()=>editTask(id)}/>
          </button>
          <button onClick={()=>deleteTask(task)}>
            <FaTrashAlt color="red" />
          </button>
          <button onClick={()=>handleComplete(id)}>
            <FaCheckDouble color="purple" />
          </button>
        </span>
      </div>
      
    </>
  );
};

export default Task;
