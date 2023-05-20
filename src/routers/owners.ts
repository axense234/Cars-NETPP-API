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

/**
 * @swagger
 * /owners:
 *  get:
 *   description: Route for getting all owners.
 *   tags:
 *    - GET Routes
 *   responses:
 *    200:
 *     description: Successfully fetched all owners.
 *    404:
 *     description: Could not find any owners to fetch.
 */
router.get("/owners", getAllOwners);

/**
 * @swagger
 * /owners/{ownerUID}:
 *  get:
 *   description: Route for getting a single owner by id.
 *   tags:
 *    - GET Routes
 *   parameters:
 *    - in: path
 *      name: ownerUID
 *      required: true
 *      schema:
 *       type: string
 *      description: The id of the owner you want to find.
 *   responses:
 *    200:
 *     description: Successfully fetched the owner by id.
 *    404:
 *     description: Could not find any owners with the respective id.
 */
router.get("/owners/:ownerUID", getOwnerByUID);

/**
 * @swagger
 * /owners/update/{ownerUID}:
 *  patch:
 *   description: Route for updating a owner.
 *   tags:
 *    - PATCH Routes
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: ownerUID
 *      required: true
 *      schema:
 *       type: string
 *      description: The id of the respective owner.
 *   requestBody:
 *    description: The properties of the owner you want to be changed.
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/components/schemas/Owner"
 *      examples:
 *       Owner:
 *        summary: A random example changing a owner's first name.
 *        value:
 *         first_name: "Bob"
 *   responses:
 *    200:
 *     description: Successfully updated owner.
 *    404:
 *     description: Could not find owner with the received id.
 *    500:
 *     description: Something with the server went wrong.
 */
router.patch(
  "/owners/update/:ownerUID",
  authenticationMiddleware,
  updateOwnerByUID
);
/**
 * @swagger
 * /owners/delete/{ownerUID}:
 *  delete:
 *   description: Route for deleting a owner by id.
 *   tags:
 *    - DELETE Routes
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: ownerUID
 *      required: true
 *      schema:
 *       type: string
 *      description: The id of the owner you want to delete.
 *   responses:
 *    200:
 *     description: Successfully deleted owner.
 *    404:
 *     description: Could not find any owners to delete with the received id.
 *    500:
 *     description: Read received error message for more info.
 */

router.delete(
  "/owners/delete/:ownerUID",
  authenticationMiddleware,
  deleteOwnerByUID
);

// Export
export default router;
