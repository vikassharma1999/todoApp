import {createSlice} from "@reduxjs/toolkit"
import {isAuthenticated} from "../../app/helper/index";
const initialState = {
	isLoggedIn:isAuthenticated()
}

const userSlice = createSlice({
	name:"user",
	initialState,
	reducers:{
		onLogout(state){
			state.isLoggedIn=false
		}
	}
})

export const {onLogout} = userSlice.actions
export default userSlice.reducer