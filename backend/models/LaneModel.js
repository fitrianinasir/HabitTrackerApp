import mongoose from "mongoose";

const Lane = mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  currentPage:{
    type: Number
  },
  title:{
    type: String
  },
  label:{
    type: String
  },
  cards:[
    {
      id: {
        type: mongoose.Schema.ObjectId,
        auto: true
      },
      title: String,
      laneId: String,
      label: String, 
      description: String
    }
  ]
})


export default mongoose.model('Lanes', Lane)

