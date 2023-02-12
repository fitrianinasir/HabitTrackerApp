import { request } from "express";
import Board from "../models/BoardModel.js";
import Lane from "../models/LaneModel.js";
import mongoose from "mongoose";

export const createBoard = async (req, res) => {
  const newBoard = new Board(req.body);
  try {
    const created_board = await newBoard.save();
    res.status(201).json(created_board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBoard = async (req, res) => {
  try {
    const get_boards = await Board.find();
    res.status(200).json({ boards: get_boards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reorderBoard = async (req, res) => {
  try {
    await Board.remove()
    const updateAll = await Board.insertMany(req.body.data);
    res.status(200).json({ message: updateAll });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBorder = async(req,res) => {
  try{
    const delete_board = await Board.deleteOne({_id: req.params.id})
    const check_lane = await Lane.findOne({parentBoardId: req.params.id})

    if(check_lane){
      await Lane.deleteMany({parentBoardId: req.params.id})
    }

    res.status(200).json({message: delete_board})
  }catch(error){
    res.status(500).json({message: error.message})
  }
}
