import express from "express";
import { getAllIPOs, addIPO, updateIPO, deleteIPO } from "../controllers/ipoController.js";

const router = express.Router();

router.get("/", getAllIPOs);
router.post("/", addIPO);
router.put("/:id", updateIPO); 
router.delete("/:id", deleteIPO);

export default router;
