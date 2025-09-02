import React, { useState } from 'react'

function Home() {
const [tasks,settask]=useState('');
const [mtasks,msettask]=useState({todo:[],ongoing:[],completed:[]})

const handleinput = (e)=>{
    settask(e.target.value);
}

const addtask = ()=>{
    if(tasks!=''){
        msettask ((prev)=>({...prev,todo:[...prev.todo,tasks],})
   ),settask('') }
}

const moveTo = (currentcatg,currenttarg,t)=>{
    msettask((prev)=>{
        const updatecurrent = prev[currentcatg].filter(
            (ti)=>ti!==t
        )
        const updatetarget = [...prev[currenttarg],t]
        return {...prev,[currentcatg]:updatecurrent,[currenttarg]:updatetarget}
    })
}
  return (
    <>
    <div className='alhome'>
        <form className='task-form'
        onSubmit={(e)=>{
            e.preventDefault();
            addtask();
        }}
        >  
    <div className='home'>Home</div>
    <input
     type="text"
     placeholder='Enter task'
     className='inputbox'
     value={tasks}
     onChange={handleinput}/>
     <button onClick={()=>addtask()}>ADD</button>
</form>
     <div className='all-tasks-sections'>
        <div className="task-section">
            <h2>TO-DO-LIST</h2>
            <ul>
                {mtasks.todo.map((t,index)=>(
                    <li key={index}>
                        {t}
                        <button onClick={()=>moveTo('todo','ongoing',t)}>Move to ongoing</button>
                        <button onClick={()=>moveTo('todo','completed',t)}>Move to completed</button>
                        
                    </li>
                ))}
            </ul>
        </div>
        <div className='task-section'>
            <h2>ONGOING</h2>
            <ul>
                {mtasks.ongoing.map((t,index)=>(
                    <li key={index}>
                        {t}
                        <button onClick={()=>moveTo('ongoing','todo',t)}>Move to todo</button>
                         <button onClick={()=>moveTo('ongoing','completed',t)}>Move to Completed</button>
                    </li>
                        ))  }
            </ul>
        </div>
        <div className='task-section'>
            <h2>COMPLETED TASKS</h2>
            <ul>
                {mtasks.completed.map((t,index)=>(
                   <li key={index}>{t}
                   <button onClick={()=>moveTo('completed','todo',t)}>Move to todo</button>
                   <button onClick={()=>moveTo('completed','ongoing',t)}>Move to ongoing</button>
                   </li>
                ))}     
            </ul>
        </div>
     </div>
     </div>
     </>

    
     
  )
}

export default Home