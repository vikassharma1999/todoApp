//middleware to check if user is Authenticated or not 
const User = require("./models/user");
exports.isSignedIn = (req,res,next)=>{
	var d=new Date();
	
	if(req.isAuthenticated()){
		next();
		return;
	}
	else if(req.cookies.cookieData){
		const tokenFromCookie = req.cookies.cookieData.token;
		const userId = req.cookies.cookieData.id;
		User.findById(userId).exec(function(err,user){
		if(err) throw err;
		if(user.token == tokenFromCookie){
			next();
			return;
		}
		else{
			res.redirect("/auth/login")
			return;
		}
	})
		return;
}

	res.redirect("/auth/login")
}
