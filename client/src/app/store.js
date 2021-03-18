import {configureStore} from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'
import userReducer from "../features/user/userSlice"
export default configureStore({
    reducer:{
       tasks:tasksReducer,
       user:userReducer
    }
})

