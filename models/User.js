const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        validate:{
            validator : validator.isEmail,
            message:'Please provide valid email'
        }
        //we use the inbuilt validator package that contains many validations in it easy to implement, instead of writing everytime
        // match: [ 
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //     'Please provide a valid email'],
        // unique:true,
    },
    password:{
        type:String,
        required:[true,'Please provide passsword'],
        minlength:6,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    }
})

module.exports = mongoose.model('User',userSchema);