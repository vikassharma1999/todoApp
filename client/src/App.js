import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import Navbar from './app/Navbar'
import AddTaskForm from './features/tasks/AddTaskForm'
import './App.css'
import UserSignup from './features/user/UserSignup'
import UserLogin from './features/user/UserLogin'

const App = ()=>{
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/" render={() => <UserLogin/>}/>
                <Route exact path="/auth/login" component={UserLogin}/>
                <Route exact path="/auth/signup" component={UserSignup}/>
                <Route exact path="/taskboard" component={AddTaskForm}/>
            </Switch>
        </Router>
    )
}

export default App

