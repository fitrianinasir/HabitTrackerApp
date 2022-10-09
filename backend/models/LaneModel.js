import mongoose from "mongoose";

const Lane = mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  currentPage:{
    type: Number,
    required: true
  },
  title:{
    type: String,
    required: true,
  },
  label:{
    type: String,
    required: true
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

