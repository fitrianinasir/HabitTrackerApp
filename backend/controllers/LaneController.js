import Lane from "../models/LaneModel.js";

export const getLanes = async (req, res) => {
  try {
    const lanes = await Lane.find();
    res.json(lanes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLane = async (req, res) => {
  const newLane = new Lane(req.body);
  try {
    const created_lane = await newLane.save();
    res.status(201).json(created_lane);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLane = async(req, res) => {
  try{
    const updated_lane = await Lane.updateOne(
      {id: req.params.id},
      {$set: req.body}
    )
    res.status(200).json(updated_lane)
  }catch (error) {
      res.status(400).json({ message: error.message });
    }
}

export const deleteLane = async(req, res) => {
  try{
    const deleted_lane = await Lane.deleteOne({id: req.params.id})
    res.status(200).json(deleted_lane)
  }catch(error){
    res.status(400).json({message:error.message})
  }
}