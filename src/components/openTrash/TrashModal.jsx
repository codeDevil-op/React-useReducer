import React from 'react'
import './TrashModal.css'
import { FaTrashAlt,FaUndoAlt } from 'react-icons/fa'
const TrashModal = ({trashModalTask,onCloseModal,deleteSingleItem,emptyTrash,recoveredTodo}) => {


  return (
    <>
    
        <div className='trash'>
        <div className="trash-modal">

          <div className="header">
            <span className='title'>Your Trash</span>
            <button className='close' onClick={onCloseModal}>&times;</button>
          </div>

          <article className="--flex-center --my2">
        <div className="--width-500px --p">
          <h2 className="" style={{ textAlign: 'center', marginBottom:'16px'}}>Deleted Task</h2>
          <hr style={{ background: "#fff", marginBottom:'10px' }} />
          {/* content  */}
          {trashModalTask.length === 0 ? 
            (<p style={{color:'gray'}}>Trash Is Empty Now!</p>)
            :(
              <>
              {trashModalTask.map((trashItems)=>{
        const {id,name,date} = trashItems

        return (
            <div key={id} className='trash-items' style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px', margin:'16px 0'}}>
        <span>
         <p>
          <b>Task:</b> {name}
         </p>
         <p>
          <b>Date:</b> {date}
         </p>
        </span>

        <span>
        
          <button style={{background:'#fff', border:'none', cursor:'pointer'}}>
            <FaTrashAlt size={22} color="red" onClick={()=>deleteSingleItem(id)}/>
          </button>
          <button style={{background:'#fff', border:'none', cursor:'pointer', marginLeft:'10px'}}>
           <FaUndoAlt size={22} color='#721c24' onClick={()=>recoveredTodo(id)}/>
          </button>
        </span>
      </div>
        )

    })}
              </>
            )
          }
          
          
      {/* content  */}
      </div>
      </article>

          <div className="buttons">
          <button className='btn btn-ok'  onClick={emptyTrash}>Remove All</button>
          <button className='btn btn-cancel' onClick={onCloseModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrashModal