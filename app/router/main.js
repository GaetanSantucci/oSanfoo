import {Router} from "express";
const router = Router()
import { displayHomepage } from '../controllers/mainController.js'


router.get("/", displayHomepage )

export { router };