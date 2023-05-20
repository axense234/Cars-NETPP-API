import express from "express";

// Controllers and Middleware
import { createOwner, loginOwner, swgAuthorization } from "../controllers/auth";

const router = express.Router();

router.post("/docs/auth", swgAuthorization);
/**
 * @swagger
 * /docs/auth:
 *  post:
 *   description: Route for Swagger Authorization.
 *   tags:
 *    - AUTHORIZE Route
 *   requestBody:
 *    description: The info required for authorization
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/components/schemas/Authorization"
 *      examples:
 *       Auth:
 *        summary: A random auth example.
 *        value:
 *         username: Bob
 *         password: bob123
 *   responses:
 *    200:
 *     description: Successfully authorized and received JWT.
 *    400:
 *     description: Please enter both username and password.
 *    401:
 *     description: Incorrect password or username.
 */

router.post("/owners/create", createOwner);
/**
 * @swagger
 * /owners/create:
 *  post:
 *   description: Route for creating an owner.
 *   tags:
 *    - POST Routes
 *   requestBody:
 *    description: The body of your new owner.
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/components/schemas/Owner"
 *      examples:
 *       Owner:
 *        summary: A random owner example
 *        value:
 *         first_name: Bob
 *         last_name: Chris
 *         password: bobchris123
 *         email: bobchris@yahoo.com
 *   responses:
 *    201:
 *     description: Successfully created an owner.
 *    400:
 *     description: Could not create owner with the info provided.
 *
 */
router.post("/owners/login", loginOwner);

/**
 * @swagger
 * /owners/login:
 *  post:
 *   description: Route for logging in as an owner.
 *   tags:
 *    - LOGIN Route
 *   requestBody:
 *    description: The email and password of the owner you want to log in.
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/components/schemas/Owner"
 *      examples:
 *       Owner:
 *        summary: A random email password example.
 *        value:
 *         password: bob123
 *         email: bob@gmail.com
 *   responses:
 *    200:
 *     description: Successfully logged in.
 *    400:
 *     description: Provide both pass and email.
 *    401:
 *     description: Unauthorized(passwords do not match).
 *    404:
 *     description: Could not find user with the received email.
 */

// Export
export default router;
