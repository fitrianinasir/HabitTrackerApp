import { request } from "express";
import Lane from "../models/LaneModel.js";
import mongoose from "mongoose";

export const getLanes = async (req, res) => {
  try {
    const lanes = await Lane.find({ parentBoardId: req.params.id });
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

export const updateLane = async (req, res) => {
  try {
    const updated_lane = await Lane.updateOne(
      { id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updated_lane);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLane = async (req, res) => {
  try {
    const deleted_lane = await Lane.deleteOne({ id: req.params.id });
    res.status(200).json(deleted_lane);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const dragLane = async (req, res) => {
  try {
    let lanes = await Lane.find();
    let to = req.body.addedIndex;
    let from = req.body.removedIndex;

    function array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
    }

    let result = array_move(lanes, from, to);

    Lane.remove({}, function (err) {
      console.log
    });

    Lane.insertMany(result);

    res.status(200).json({
      lanes: result,
      req: req.body
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addCard = async (req, res) => {
  try {
    let data = {
      id: req.body.id,
      title: typeof req.body.title === "string" ? req.body.title : "",
      label: typeof req.body.label === "string" ? req.body.label : "",
      description:
        typeof req.body.description === "string" ? req.body.description : "",
    };

    const added_card = await Lane.updateOne(
      { id: req.params.laneId },
      { $push: { cards: data } }
    );
    res.status(200).json(added_card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    let body = req.body;
    let find_card = await Lane.findOne({ id: req.params.laneId });
    let data = find_card.cards.filter((data) => data.id === req.body.id)[0];

    var objIndex = find_card.cards
      .map(function (x) {
        return x.id;
      })
      .indexOf(req.body.id);

    let merged = {
      id: req.body.id,
      title: typeof body.title === "string" ? body.title : data.title,
      label: typeof body.label === "string" ? body.label : data.label,
      description:
        typeof body.description === "string"
          ? body.description
          : data.description,
    };

    find_card.cards[objIndex] = merged;

    const updating = await Lane.findOneAndUpdate(
      { id: req.params.laneId },
      {
        $set: { cards: find_card.cards },
      }
    );
    res.status(200).json(updating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const deleted_card = await Lane.findOneAndUpdate(
      { id: req.params.laneId },
      {
        $pull: { cards: { id: req.params.cardId } },
      }
    );
    res.status(200).json(deleted_card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const cardDrag = async (req, res) => {
  try {
    let source = await Lane.findOne({ id: req.body.sourceLaneId });
    let cardIndex = source.cards.findIndex((obj) => obj.id === req.body.cardId);
    let destination = await Lane.findOne({ id: req.body.targetLaneId });

    if (req.body.sourceLaneId != req.body.targetLaneId) {
      destination.cards.splice(req.body.position, 0, source.cards[cardIndex]);
      source.cards.splice(cardIndex, 1);
      destination.save();
      source.save();
    } else {
      if (cardIndex < req.body.position) {
        source.cards.splice(req.body.position + 1, 0, source.cards[cardIndex]);
        source.cards.splice(cardIndex, 1);
      } else {
        source.cards.splice(req.body.position, 0, source.cards[cardIndex]);
        source.cards.splice(cardIndex + 1, 1);
      }
      source.save();
    }

    res.status(200).json({ source: source, req: req.body, cardIndex });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
