import express from "express";

// Controllers and Middleware
import {
  getAllCars,
  getCarByUID,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/cars";

import authenticationMiddleware from "../middleware/auth";

const router = express.Router();

/**
 * @swagger
 * /cars:
 *  get:
 *   description: Route for fetching all cars.
 *   tags:
 *    - GET Routes
 *   responses:
 *    200:
 *     description: Successfully fetched all cars.
 *    404:
 *     description: Could not find any cars to fetch.
 *
 */

router.get("/cars", getAllCars);

/**
 * @swagger
 * /cars/{carUID}:
 *  get:
 *   description: Route for fetching a single car by it's id.
 *   tags:
 *    - GET Routes
 *   parameters:
 *    - in: path
 *      name: carUID
 *      required: true
 *      schema:
 *       type: string
 *      description: The id of the wanted car.
 *   responses:
 *    200:
 *     description: Successfully fetched a single car.
 *    404:
 *     description: Could not fetch a car.
 */
router.get("/cars/:carUID", getCarByUID);

/**
 * @swagger
 * /cars/create:
 *  post:
 *   description: Route for creating a car.
 *   tags:
 *    - POST Routes
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    description: The body of the wanted to be created car.
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/components/schemas/Car"
 *      examples:
 *       Car:
 *        summary: A random car example.
 *        value:
 *         make: "Audi"
 *         model: "Q7"
 *         model_year: 2009
 *         price: "$1557.68"
 *         age: 9
 *   responses:
 *    201:
 *     description: Successfully created a car with the provided request body.
 *    400:
 *     description: Please enter a valid request body!
 *
 */

router.post("/cars/create", authenticationMiddleware, createCar);

/**
 * @swagger
 * /cars/update/{carUID}:
 *  patch:
 *   description: Route for updating a car.
 *   tags:
 *    - PATCH Routes
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: carUID
 *      required: true
 *      schema:
 *       type: string
 *      description: The id of the car you want to update.
 *   requestBody:
 *    description: The properties of the car you want to update.
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/components/schemas/Car"
 *      examples:
 *       Car:
 *        summary: A random change of a car's age.
 *        value:
 *         age: 23
 *   responses:
 *    200:
 *     description: Successfully updated the car with the provided id.
 *    400:
 *     description: Please provide a proper car request body.
 *    404:
 *     description: Could not find the car with the provided id in order to update it.
 *
 *
 */
router.patch("/cars/update/:carUID", authenticationMiddleware, updateCar);

/**
 * @swagger
 * /cars/delete/{carUID}:
 *  delete:
 *   description: Route for deleting a car with an id.
 *   tags:
 *    - DELETE Routes
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: carUID
 *      required: true
 *      schema:
 *       type: string
 *      description: The id of the car you want to delete.
 *   responses:
 *    200:
 *     description: Successfully deleted the car with the provided id.
 *    404:
 *     description: Could not find car with provided id in order to delete it.
 */
router.delete("/cars/delete/:carUID", authenticationMiddleware, deleteCar);

// Export
export default router;
