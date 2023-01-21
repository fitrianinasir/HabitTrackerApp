import mongoose from "mongoose";


const Board = mongoose.Schema({
  id:{
    type: String
  },
  title:{
    type: String
  },
  description:{
    type: String
  }
})

export default mongoose.model('Board', Board)