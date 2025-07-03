// users [icon: user] {
//   id string pk
//   username string
//   email string
//   fullName string
//   avatar string
//   coverImage string
//   watchHistory ObjectId[] videos
//   password string
//   refreshToken string
//   createdAt Date
//   updatedAt Date
// }

import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({

  username : {
    type : String,
    required : true,
    unique: true,
    lowercase : true,
    trim : true,
    index : true

  },
  email : {
    type : String,
    required : true,
    unique: true,
    lowercase : true,
    trim : true,

  },
  fullname : {
    type : String,
    required : true,
    trim : true,
    index : true,
  },
  avatar : {
    type : String, // cloudinary url
    required : true,

  },
  coverImage : {
    type : String,
    required : true,

  },

  watchHistory : [
    {
    type : mongoose.Schema.Types.ObjectId,
    ref : "video",

  },
],
  password : {
    type : String,
    required : [true,'Password is required']

  },
  refreshToken : {
    type : String,
    required : true,

  },

},{timestamps : true})


//pre hook that is a part of middleware basically what it does is lets say i have something i want to do just before saving like password encrypt karna and all like just just before saving the file karna hai that we do via pre hook



userSchema.pre("save",async function(next) {
  //never use arrow function in pre hooks as yaha scope and this use hota hai and this variable doesnt work for arrow function isliye use normal function and baat rhi hash rounds ki this isl ike no. of locks you wanna put on your password

  if(!this.isModfied("password")) return next()

  this.password = bcrypt.hash(this.password,10)
  next()
})


userSchema.methods.isPasswordCorrect = async function (password){

  return await bcrypt.compare(password,this.password)
}
export const user = mongoose.model("user",userSchema)