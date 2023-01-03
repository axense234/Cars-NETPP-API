import express from "express";

// Controllers and Middleware
import {
  getAllOwners,
  getOwnerByUID,
  updateOwnerByUID,
  deleteOwnerByUID,
} from "../controllers/owners";

import authenticationMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/owners", authenticationMiddleware, getAllOwners);
router.get("/owners/:ownerUID", authenticationMiddleware, getOwnerByUID);

router.patch(
  "/owners/update/:ownerUID",
  authenticationMiddleware,
  updateOwnerByUID
);

router.delete(
  "/owners/delete/:ownerUID",
  authenticationMiddleware,
  deleteOwnerByUID
);

// Export
export default router;
