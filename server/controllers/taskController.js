const User = require("../models/user");
const {body,validationResult} = require("express-validator");


exports.task_create_post=[
	body('title',"Title name required").trim().isLength({min:1}).escape(),
	(req,res,next)=>{
		var id=req.body.userId
		const errors = validationResult(req);
		// console.log(req.body.title)
		var task={
			title:req.body.title
		}
		User.findByIdAndUpdate(id,{$push: { tasks: task }}).exec(function(err,user){
			if(err) throw err;
			// console.log(user);
			User.findById(id).exec((err,result)=>{
				if(err) throw err;
				res.json(result.tasks)
			})
		})
		
	}
]

exports.task_list = function(req,res){
	// console.log("params:",req.params);
	var id=req.params.id;
	User.findById(id).exec(function(err,results){
		if(err) throw err;
		res.json(results);
		
	})
}

exports.task_delete=(req,res)=>{
	// console.log("Parameter :",req.params);
	var userId=req.params.userId;
	var taskId = req.params.taskId;

	// console.log("Task Id:",taskId);
	User.findOne({_id:userId}).then(function(user){
		// console.log("User find:",user);
		user.tasks.pull(taskId);
		// console.log("user afetr:",user);
		user.save().then(function(user){
			res.json(user);
		})
	})
	
}

exports.removeAll = function(req,res){
	var id=req.params.id;

	User.findByIdAndUpdate(id,{tasks:[]}).exec(function(err,results){
		if(err) throw err;
		// console.log("okk jao")
		res.json(results)
	})
}