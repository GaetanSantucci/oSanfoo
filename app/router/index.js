import {Router} from "express";
const router = Router()

import { router as mainRouter } from './main.js'
router.use(mainRouter)

export { router };
