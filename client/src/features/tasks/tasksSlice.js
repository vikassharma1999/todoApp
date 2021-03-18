import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { addTask, clearATask, clearList, taskList } from '../../app/helper'

const initialState = {
    tasks:[],
    status:'idle',
    error:null
}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (userId)=>{
        // console.log("User Id inside fetchTasks: ",userId)
        const response = await taskList(userId)
        return response.tasks
    }
)

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async initialTask =>{
        const response = await addTask(initialTask)
        // console.log(response)
        return response[response.length-1]
    }
)

export const deleteAllTask = createAsyncThunk(
    'tasks/deleteAllTask',
    async (userId)=>{
        const response = await clearList(userId)
        // console.log("Response::",response)
        return response
    }
)

export const deleteTaskById = createAsyncThunk(
    'tasks/deleteTaskById',
    async (data)=>{
        // console.log("Task Id:->:",data.taskId)
        const response = await clearATask(data.userId,data.taskId)
        return response.tasks
    }
)

const tasksSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
        clearAllOnLogout(state){
            state.tasks=[]
        }
    },
    extraReducers:{
        [fetchTasks.pending]:(state,action)=>{
            state.status="loading"
        },
        [fetchTasks.fulfilled]:(state,action)=>{
            // console.log("Fulfiledddd",action.payload)
            state.status="succeeded"
            state.tasks = state.tasks.concat(action.payload)
        },
        [fetchTasks.rejected]:(state,action)=>{
            state.status = "failed"
            state.error = action.error.message
        },
        [addNewTask.fulfilled]:(state,action)=>{
            state.tasks.push(action.payload)
        },
        [deleteAllTask.fulfilled]:(state,action)=>{
            state.tasks.splice(0)
        },
        [deleteTaskById.fulfilled]:(state,action)=>{
            state.tasks = action.payload
        }
    }
})

export const {taskAdded,taskRemoveAll,taskRemoveById,clearAllOnLogout} = tasksSlice.actions
export default tasksSlice.reducer

