import { act } from "react"

export const taskReducer = (state,action)=>{

    if(action.type ==='EMPTY_FIELD'){
        return {
            ...state,
            isAlertOpen:true,
            alertContent:'Please enter name and date',
            alertClass: 'danger',
        }
    }
    if(action.type==='CLOSE_ALERT'){
        return {...state,isAlertOpen:false}
    }
    if(action.type==='ADD_TASK'){
        // return{...state,}
         const allTask = [...state.tasks,action.payload]
         return{
            ...state,
            tasks:allTask,
            isAlertOpen:true,alertContent:'Task Added Successfully',alertClass:'success',
            recover:''
        }
         
    }
    if(action.type ==='OPEN_EDIT_MODAL'){
      return {
        ...state,
        isEditModalOpen:true,
        taskid:action.payload,
        modalTitle:'Edit Task',
        modalMsg:'You are about to edit this task',
        modalActionText: 'Edit',
      }
    }
    if(action.type==='EDIT_TASK'){
      return{...state,isediting:true}
    }
    if(action.type === 'CLOSE_MODAL'){
      return{...state,isEditModalOpen:false,isDeleteModalOpen:false,isTrashModalOpen:false,isCommandModalOpen:false}
    }
    if(action.type==='UPDATE_TASK'){
      // console.log(action.payload)
      const updatedTask = action.payload 
      const {name,date,completed} = updatedTask
      const newTask = state.tasks.map((task)=>{
        if(task.id===action.payload.id){
    
          return {...task,name,date,completed}
        }
        return task
      })
      return {
        ...state,
        tasks:newTask,
        isediting:false,
        isAlertOpen:true,
        alertContent:'Task Edited Successfully',
        alertClass:'success',
        recover:''
      }
      
    
      
      // Find the task index 

      // const taskIndex = state.tasks.findIndex((task)=>{
      //   return task.id===id
      // })

      // Replace the task by its index 

      // if(taskIndex !==-1){
      //   state.tasks[taskIndex] = updatedTask
      // }

      // return{
      //   ...state,
      //   isediting:false,
      //   isAlertOpen:true,
      //   alertContent:'Task Edited Successfully',
      //   alertClass:'success'
      // }

    }
    if(action.type==='COMPLETE_TASK'){
      const taskCompleted = state.tasks.map((task)=>{
        if(task.id===action.payload){
          return{...task,completed:!task.completed}
        }
        return task;
      })
      return{
        ...state,
        tasks:taskCompleted,
        // isAlertOpen:true,
        // alertContent:'Task Completed Successfully',
        // alertClass:'success'
      }
    }
    if(action.type==='OPEN_DELETE_MODAL'){
      // console.log('i am at open',action.payload)
      return {
        ...state,
        trashedTask:action.payload,
        isDeleteModalOpen:true,
        taskid:action.payload.id,
        modalTitle:'Delete Task',
        modalMsg:'You are about to Delete this task',
        modalActionText: 'Delete',
        
      }
    }
    if(action.type==='DELETE_TASK'){
      const {id,delTask} = action.payload
      const newTasked = state.tasks.filter((task)=>task.id!==action.payload.id);
     
      // console.log(goToTrash)
      return {
        ...state,
        tasks:newTasked,
        isDeleteAnimation:true,
        isAlertOpen:true,
        alertContent:'Task Deleted Successfully',
        alertClass:'success',
        recover:true
      }
    }
    if(action.type==='TASK_RECOVER'){
      // console.log(state.recoverTodo)
      // const taskRecovered = state.recoverTodo.filter((task)=>{
      //   if(task.id===action.payload){
      //     return {...state.tasks,task}       
      //   }
      //   return task
      // })
      
      return{
        ...state,
        isTrashModalOpen:true,
        // tasks:taskRecovered,
        // isAlertOpen:true,
        // alertContent:'Task Recovered',
        // alertClass:'success',
        // recover:false
      }
    }
    
    if(action.type ==='OPEN_COMMAND_MODEL'){
      return {
        ...state,
        isCommandModalOpen:true,
        modalTitle:'Enter Command',
        // modalMsg:<input type="text" placeholder="Enter Command 'Trash'"/>,
        modalActionText:'Go To'
      }
    }
    if(action.type==='OPEN_TRASH_MODAL'){
      return{
        ...state,
        isTrashModalOpen:true,
        isCommandModalOpen:false,
      }
    }
    if(action.type === 'RECOVER_FROM_TRASH'){
      // console.log(action.payload)
      const task = action.payload
      const taskRecovered = [...state.tasks,task]
      return {
        ...state,
        tasks:taskRecovered,
        isTrashModalOpen:false,
      }
    }
    return state;
   
}