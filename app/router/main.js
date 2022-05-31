import {Router} from "express";
const router = Router()
import { getAllUsers, getOneUser, createNewUser } from '../controllers/mainController.js'


router.get("/users", getAllUsers )
router.get("/users/:id", getOneUser)

router.post("/signup", createNewUser)

export { router };