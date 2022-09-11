import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const created_user = await user.save();
    res.status(201).json(created_user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated_user = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updated_user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted_user = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(deleted_user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const massDeleteUser = async (req, res) => {
  try {
    const removeIDs = req.body;
    const deletedData = await User.deleteMany({ _id: removeIDs });
    res.status(200).json(deletedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
