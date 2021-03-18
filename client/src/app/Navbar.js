import React,{useState} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {signout} from "../app/helper/index";
import {clearAllOnLogout} from "../features/tasks/tasksSlice";
import {onLogout} from "../features/user/userSlice";

const Navbar = () =>{
    // const [isLoggedIn,setIsLoggedIn] = useState(isAuthenticated())
    const [success,setSuccess] = useState(false)
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
    const dispatch = useDispatch()

    const handleLogout=()=>{
        signout(()=>{
            // console.log("Success")
            // setIsLoggedIn(false)
            setSuccess(true)
            dispatch(onLogout())
            dispatch(clearAllOnLogout())
        })
    }
    return(
            <header>
                <div>Todo App</div>
                {isLoggedIn && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
                {success && <Redirect to="/auth/login"/>}
            </header>
        )
}

export default Navbar;

