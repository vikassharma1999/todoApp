const express = require("express");
const {body,validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const router = express.Router();
var passportGoogle = require('../auth/google');
var passportTwitter = require('../auth/twitter');
var passportFacebook = require('../auth/facebook');





/* FACEBOOK ROUTER */
router.get('/facebook',
  passportFacebook.authenticate('facebook'));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/auth/login' }),
  function(req, res) {
   
    res.cookie("user_id",req.user.doc._id,{expire: new Date()+9999})
    res.json(req.user.doc)//use if want to connect this app with frontend(react)
  });

/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', { scope: 'https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile' }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/auth/login' }),
  function(req, res) {
    res.cookie("user_id",req.user.doc._id,{expire: new Date()+9999})
    res.json(req.user.doc)
  });

/* TWITTER ROUTER */
router.get('/twitter',
  passportTwitter.authenticate('twitter'));

router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/auth/login' }),
  function(req, res) {
    
    res.cookie("user_id",req.user.doc._id,{expire: new Date()+9999})
    res.json(req.user.doc)
  });



router.post("/login",(req,res)=>{
	const {email,password}=req.body
	User.findOne({email},(err,user)=>{
		if(err) throw err;
		if(!user || user.password==undefined){
			res.json({error:"user not found"})
			return;
		}
		bcrypt.compare(password,user.password).then((result)=>{
			if(!result){
				res.json({error:"password incorrect!!!"})
				return;
			}
			const token=jwt.sign({_id:user._id,tokenId:uuidv4()},"vikassharma");
			var cookieData = {
				token:token,
				id:user._id
			}
			res.cookie("cookieData",cookieData,{expire: new Date()+9999})

			User.findByIdAndUpdate(user._id,{token:token}).exec(function(err,results){
				if(err) throw err;
			
				const {_id,name,email}=user;
				return res.json({token,user:{_id,name,email}});//use this if want to connect this with frontend
				})

			
		})
	})

})

router.post("/signup",[
		body('name',"Name is required").trim().isLength({min:1}).escape(),
		body('email',"Email is required").escape(),
		body('password').isLength({min:5}).withMessage("min 5 char password is required")
	],
	(req,res)=>{
	const {name,email,password} = req.body;
	const errors  = validationResult(req)
	if(!errors.isEmpty()){
		res.json({error:errors.array()[0].msg})
		return;
	}
	var newUser = new User({
		name:name,
		email:email,
		password:password
	})

	bcrypt.hash(password,10).then((hash)=>{
		newUser.password=hash
		User.findOne({email},(err,user)=>{
			if(err) throw err;
			if(user){
				res.json({error:"User already exists"})
				return;
			}
			newUser.save((err,user)=>{
				if(err) throw err;
				// console.log("USer inside backend:",user)
				res.json({
					name:user.name,
					email:user.email,
					id:user._id
				})
			})
		})
	})




})

router.get("/logout",(req,res)=>{
	res.clearCookie("cookieData");
	res.clearCookie("user_id")
	req.logout();
	res.json({
		message:"user signout success..."
	})
})



module.exports = router;

