import express from "express";
import {
  getUsers,
  getUserByID,
  register,
  login,
  updateUser,
  deleteUser,
  massDeleteUser,
} from "../controllers/UserController.js";

import {
  getLanes,
  createLane,
  updateLane,
  deleteLane,
  dragLane,
  addCard,
  updateCard,
  deleteCard,
  cardDrag
} from "../controllers/LaneController.js"

const router = express.Router();
router.get("/users", getUsers);
router.get("/user/:id", getUserByID);
router.post("/register", register);
router.post("/login", login);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/delete-users", massDeleteUser);

router.get("/lanes", getLanes);
router.post("/lane", createLane);
router.put('/lane/:id', updateLane)
router.put('/lane', dragLane)
router.delete("/lane/:id", deleteLane)


router.post("/card/:laneId", addCard)
router.put("/card/:laneId", updateCard)
router.delete("/card/:cardId/:laneId", deleteCard)
router.put("/card", cardDrag)
export default router;
