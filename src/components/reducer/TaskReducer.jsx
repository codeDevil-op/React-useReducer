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
            isAlertOpen:true,alertContent:'Task Added Successfully',alertClass:'success'
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
      return{...state,isEditModalOpen:false,isDeleteModalOpen:false}
    }
    if(action.type==='UPDATE_TASK'){
      // console.log(action.payload)
      // const updatedTask = action.payload 
      const newTask = state.tasks.map((task)=>{
        if(task.id===action.payload.id){
          return {...task,name:action.payload.name,date:action.payload.date,completed:action.payload.completed}
        }
        return task
      })
      return {
        ...state,
        tasks:newTask,
        isediting:false,
        isAlertOpen:true,
        alertContent:'Task Edited Successfully',
        alertClass:'success'
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
      return{...state,tasks:taskCompleted}
    }
    if(action.type==='OPEN_DELETE_MODAL'){
      return {
        ...state,
        isDeleteModalOpen:true,
        taskid:action.payload,
        modalTitle:'Delete Task',
        modalMsg:'You are about to Delete this task',
        modalActionText: 'Delete',
      }
    }
    if(action.type==='DELETE_TASK'){
      const newTasked = state.tasks.filter((task)=>task.id!==action.payload);
      return {
        ...state,
        tasks:newTasked,
        isDeleteAnimation:true,
        isAlertOpen:true,
        alertContent:'Task Deleted Successfully',
        alertClass:'danger'
      }
    }
    return state;
   
}