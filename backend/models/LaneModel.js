import mongoose from "mongoose";

const Lane = mongoose.Schema({
  id: {
    type: String
  },
  parentBoardId:{
    type: String
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
      id: String,
      title: String,
      laneId: String,
      label: String, 
      description: String
    }
  ]
})


export default mongoose.model('Lanes', Lane)

