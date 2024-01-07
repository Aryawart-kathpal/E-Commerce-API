require('dotenv').config();
const User =require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
const {attachCookiesToResponse,createTokenUser} = require('../utils');

const register = async(req,res)=>{
    //This may not have to be done, as it is already being handled in the schema, unique:true
    const {email,name,password} =req.body;// we extract email,name,password only from req.body so that the role can't be sent from the frontend, it is just to make the 'role' in the backend more secure
    // setting the admin therefore can be done from postman or manually in the Database
    const emailAlreadyExists = await User.findOne({email});
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError("Email already exists!!");
    }

    // First registered user is the admin
    const isFirstAccout = await User.countDocuments({}) === 0;
    const role = isFirstAccout?'admin':'user';

    const user = await User.create({email,name,password,role});

    const tokenUser =createTokenUser(user);
    // const token = jwt.sign(tokenUser,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME}); // this step has now been done in the createJWT() in the utils folder
    // const token =createJWT({payload : tokenUser});

    // const oneDay = 1000*60*60*24;// millisecond in one day, so here what I mean, is that I want my cookie to be alive only for one day

    // //res.cookie(name,value,options)
    // res.cookie('token',token,{
    //     httpOnly:true,
    //     expires: new Date(Date.now()+oneDay),
    // })
    // now all the above is done in the jwt.js in the utils, to refactor it

    attachCookiesToResponse({res,user:tokenUser});

    // instead of sending the token everytime to the frontend, we use cookies to send the token
    return res.status(StatusCodes.CREATED).json({user:tokenUser/*,token*/});
}

const login = async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        throw new CustomError.BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({email});

    if(!user){
        throw new CustomError.UnauthenticatedError(`No user exists with email ${email}`);
    }

    const isPasswordCorrect = await user.comparePassword(password);// await is must here
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError("Incorrect password entered");
    }

    const tokenUser =createTokenUser(user);
    attachCookiesToResponse({res,user:tokenUser});

    res.status(StatusCodes.OK).json({user : tokenUser});
}

// we expire the cookie and in console, we find that req.signedCookies has empty object with no token 
const logout = async(req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires : new Date(Date.now()/*+5*1000*/),
    })
    res.status(StatusCodes.OK).json({msg:"user logged out"});
}

module.exports={register,login,logout};