const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name : {
    type:String,
    trim:true,
    required:[true,'Please provide product name'],
    maxlength:[100,"Name can't be more than 100 characters"],
  },
  price :{
    type:Number,
    required:[true,'Please provide price'],
    deafult:0,
  },
  description:{
    type:String,
    required:[true,'Please provide product description'],
    maxlentgh:[1000,"Description can't be more than 100 characters"],
  },
  image:{
    type:String,
    default:'/uploads/example.jpg',
  },
  category:{
    type:String,
    required:[true,'Please provide the product category'],
    enum:['office','kitchen','bedroom'],
  },
  company:{
    type:String,
    required:[true,'Please provide company name'],
    enum:{
        values:['ikea','liddy','marcos'],
        message:'{VALUE} is not supported',
    },
  },
  colors:{
    type:[String],
    default:['#222',],
    required:true,
  },
  featured:{
    type:Boolean,
    default:false,
  },
  freeShipping:{
    type:Boolean,
    default:false,
  },
  inventory:{
    type:Number,
    required:true,
    default:15,
  },
  averageRating:{
    type:Number,
    deafult:0,
  },
  user:{
    type: mongoose.Types.ObjectId,
    ref:'User',
    required:true,
  }
},{timestamps:true});

module.exports = mongoose.model('Product',productSchema);