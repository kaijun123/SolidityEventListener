import { Router } from "express";
import transfer from "./transfer"
import test from "./test"

const router = Router()

router.get("/transfer", transfer)
router.get("/test", test)

export default router;