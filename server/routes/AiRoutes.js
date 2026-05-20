import express from "express";
import { testAI } from "../controller/AiController.js";

const router = express.Router();

router.post("/create",testAI);

export default router;