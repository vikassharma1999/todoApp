import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {deleteAllTask, deleteTaskById, fetchTasks} from './tasksSlice'

const TasksList = ({userId}) => {
    const tasks = useSelector(state=>state.tasks.tasks)
    const taskStatus = useSelector(state=>state.tasks.status)
    const error = useSelector(state=>state.tasks.error)

    const handleRemoveAll = () => {
        dispatch(deleteAllTask(userId))
    }

    const handleRemoveById = (taskId) => {
        // console.log("Task Id:",taskId)
        dispatch(deleteTaskById({userId,taskId}))
    }

    const dispatch = useDispatch()

    useEffect(()=>{
        if(taskStatus === "idle"){
            // console.log("User Id:",userId)
            dispatch(fetchTasks(userId))
        }
    },[taskStatus,userId,dispatch])

    let content;
    if(taskStatus === "loading"){
        content = <div style={{color:"white"}}>Loading...</div>
    }
    else if(taskStatus === "succeeded"){
        content = (tasks.length>0 && <div className="tasksBoard">
        <ul className="taskboard-ul">
        {tasks.map(task=>(
            <li key={task._id} className="taskboard-li">
                <input type="checkbox"/>
                <label>{task.title}</label>
                <span className="delete" onClick={()=>handleRemoveById(task._id)}>
                    <i className="fa fa-trash"></i>
                </span>
            </li>
            ))}
        </ul>
        <button className="clear-btn" onClick={handleRemoveAll}>Clear All</button>
</div>)
    }
    else if(taskStatus==="failed"){
        content = <div>{error}</div>
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    )
}

export default TasksList

