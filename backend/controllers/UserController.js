import User from "../models/UserModel.js";
import bcrypt from "bcrypt"

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

export const register = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "User already exist" });

  const newUser = new User(req.body);
  // hashing password
  bcrypt.hash(req.body.password, 7, async (err, hash) => {
    if (err)
      return res
        .status(400)
        .json({ message: "Error while saving the password" });
    newUser.password = hash;
    try {
      const created_user = await newUser.save();
      res.status(201).json(created_user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const login = async(req,res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "User not found" });

  // compare password
  const matchPassword = await bcrypt.compare(req.body.password, user.password)
  if(matchPassword) {
    return res.status(200).json({message:"You have logged successfully"})
  }else{
    return res.status(400).json({message:"Invalid credential"})
  }

}

export const updateUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "User not found" });

  bcrypt.hash(req.body.password, 7, async (err, hash) => {
    if (err)
      return res
        .status(400)
        .json({ message: "Error while saving the password" });
    req.body.password = hash;
    try {
      const updated_user = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      res.status(201).json(updated_user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
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
