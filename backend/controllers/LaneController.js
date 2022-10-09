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
