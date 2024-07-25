import { Router } from "express";
import test from "./test";
import transfer from "./transfer";

const router = Router()

router.get("/transfer", transfer)
router.get("/test", test)

export default router;