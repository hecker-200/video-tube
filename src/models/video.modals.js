
  // id string pk
  // owner ObjectId users
  // videoFile string
  // thumbnail string
  // title string
  // description string
  // duration number
  // views number
  // isPublished boolean
  // createdAt Date
  // updatedAt Date

  //we save the data its saved in the database in the bson (BINARY JSON) format and other than the data bein simplified the data is saved with an id now the json if it provides an id the bson uses that id 
import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new mongoose.Schema({

  owner : {
    type : mongoose.Schema.Types.ObjectId,
  ref : "user"
  },
  videofile :{
    type : String,
    unique : true,
    required : true,
  },

  thumbnail : {

    type : String,
    required : true,
  },

  title : {

    type : String,
    required : true,
  },
  description : {

    type : String,
    required : true,
  },

  views : {

    type : Number,
    default : 0,
  },

  duration : {

    type : Number,
    required : true,
  },
  ispublished : {

    type : Boolean,
    default : true,
  },
},{timestamps : true})


videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model("video",videoSchema)