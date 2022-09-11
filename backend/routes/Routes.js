import express from "express"
import { getUsers, getUserByID, register, login, updateUser, deleteUser, massDeleteUser } from "../controllers/UserController.js"

const router = express.Router()
router.get("/users", getUsers)
router.get("/user/:id", getUserByID)
router.post("/register", register)
router.post("/login", login)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)
router.post("/delete-users", massDeleteUser)

export default router