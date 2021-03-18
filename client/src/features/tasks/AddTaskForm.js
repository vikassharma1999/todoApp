import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import TasksList from './TasksList'
import { addNewTask } from './tasksSlice'
import {isAuthenticated} from '../../app/helper/index'
import {Redirect} from 'react-router-dom'

const AddTaskForm = () =>{
    const dispatch = useDispatch()
    const {user} = isAuthenticated()
    // console.log("User:",user._id)
    const [title,setTitle] = useState("")
    const handleTitleChanged = (event) => setTitle(event.target.value)

    const handleSubmit = (event)=>{
        event.preventDefault()
        const userId=user._id
        dispatch(addNewTask({userId,title}))
        setTitle("")
    }

    return (
        <React.Fragment>
            {!isAuthenticated()? <Redirect to="/auth/login"/> :(
                  <div className="main">
                    <h1>TO-DO LIST</h1>       
                    <form className="taskboard-form" onSubmit={handleSubmit}>
                        <input type="text" name="title" placeholder="new task" id="title" required={true} value={title} onChange={handleTitleChanged}/>
                        <button className="taskboard-btn"><strong>ADD</strong></button>
                    </form>
                    <TasksList userId={user._id}/>
                  </div>
            )}
        </React.Fragment>
    )
}

export default AddTaskForm

