const User = require('../models/User');
const CustomError = require('../errors');
const {StatusCodes}= require('http-status-codes');

const getAllUsers= async(req,res)=>{
    console.log(req.user);
    let users = await User.find({role:'user'}).select('-password');
    res.status(StatusCodes.OK).json({users});
}

const getSingleUser= async(req,res)=>{
    const {params:{id:userId}} = req;
    const user = await User.findOne({_id:userId}).select('-password');

    if(!user){
        throw new CustomError.notFoundError(`No user with id ${userId}`);
    }

    res.status(StatusCodes.OK).json({user});
}

const showCurrentUser= async(req,res)=>{
    res.send("Show current user");
}

const updateUser= async(req,res)=>{
    res.send("Update user");
}

const updateUserPassword= async(req,res)=>{
    res.send("Update user password");
}

module.exports={getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword};