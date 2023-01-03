import express from "express";

// Middleware and Controllers
import {
  getAllCars,
  getCarByUID,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/cars";

import authenticationMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/cars", authenticationMiddleware, getAllCars);
router.get("/cars/:carUID", authenticationMiddleware, getCarByUID);

router.post("/cars/create", authenticationMiddleware, createCar);

router.patch("/cars/update/:carUID", authenticationMiddleware, updateCar);

router.delete("/cars/delete/:carUID", authenticationMiddleware, deleteCar);

// Export
export default router;
