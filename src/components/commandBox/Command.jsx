import React, { useEffect, useRef, useState } from 'react'
import './Command.css'
const Command = ({modalTitle,modalMsg,modalActionText,onCloseModal,dispatch}) => {
    const [commandMsg,setCommandMsg] = useState('')
    const viewTrash = ()=>{
        if(commandMsg.toLowerCase()==='trash'){
            dispatch({
                type:'OPEN_TRASH_MODAL'
            })
            // onCloseModal()
        }
        else{
            alert(`Please Enter Command Like "trash"`)
        }
    }
    
  return (
    <>
        <div className='command'>
        <div className="command-modal">

          <div className="header">
            <span className='title'>{modalTitle}</span>
            <button className='close' onClick={onCloseModal}>&times;</button>
          </div>

          <div className="content form --form-control">
            <input autoFocus type="text" placeholder="Enter Command 'Trash'" value={commandMsg}  onChange={(e)=>setCommandMsg(e.target.value)}/>
          </div>

          <div className="buttons">
          <button className='btn btn-ok' onClick={viewTrash}>{modalActionText}</button>
          <button className='btn btn-cancel' onClick={onCloseModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Command