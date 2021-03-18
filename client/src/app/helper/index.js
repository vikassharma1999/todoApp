import API from "./backend.js";


export const signup = user => {
	return fetch(`${API}/auth/signup`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(user)
	})
	.then(response=>{
		// console.log("user",response)
		return response.json();
	})
	.catch(err=>console.log(err));
}

export const signin = user => {
	// const data = JSON.stringify(user);
	// console.log("Dataa:",user)
	// console.log("INDEX USER:",user.email)
	// console.log(API)
	return fetch(`${API}/auth/login`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(user)
	})
	.then(response=>{
		// console.log(response)
		return response.json();
	})
	.catch(err=>{
		// console.log("ERRRORR")
		console.log(err)});
}

export const authenticate = (data,next)=>{
	// console.log("Auth data:-",data)
	if(typeof window !=="undefined"){
		// console.log("aacha thik hai")
		localStorage.setItem("jwt",JSON.stringify(data));
		next();
	}
}

export const signout = next =>{
	if(typeof window!=="undefined"){
		localStorage.removeItem("jwt");
		next();
		return fetch(`${API}/auth/logout`,{
			method:"GET"
		})
		.then(response=>{
			return response}
			)
		.catch(err=>console.log(err));
	}
}

export const isAuthenticated = ()=>{
	if(typeof window =="undefined"){
		return false;
	}
	

	if(localStorage.getItem("jwt")){
		return JSON.parse(localStorage.getItem("jwt"))
	}
	else{
		return false;
	}
}

export const addTask = (data)=>{
	// console.log("Dataa:::",data)
	return fetch(`${API}/task/create`,{
		method:"POST",
		headers:{
			Accept:"application/json",
			"Content-Type":"application/json"
		},
		body:JSON.stringify(data)
	}).then(res=>{
		return res.json();
	})
	.catch(err=>console.log(err))
}

export const taskList = (userId)=>{
	return fetch(`${API}/task/create/${userId}`,{
		method:"GET"
	})
	.then(response=>{
		return response.json();
	})
	.catch(err=>console.log(err));
}

export const clearList = (userId)=>{
	return fetch(`${API}/task/removeAll/${userId}`,{
		method:"GET"
	})
	.then(response=>{
		// console.log("aaya ya nhi..???")
		// console.log("response btana:",response)
		return response.json();
	})
	.catch(err=>console.log(err));
}
export const clearATask = (userId,taskId)=>{
	return fetch(`${API}/task/delete/${userId}/${taskId}`,{
		method:"GET"
	})
	.then(response=>{
		return response.json()
	})
	.catch(err=>console.log(err))
}


