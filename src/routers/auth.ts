import express from "express";

// Controllers and Middleware
import { createOwner, loginOwner } from "../controllers/auth";

const router = express.Router();

router.post("/owners/create", createOwner);
router.post("/owners/login", loginOwner);

// Export
export default router;
