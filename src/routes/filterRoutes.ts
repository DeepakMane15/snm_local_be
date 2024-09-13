import express from "express";
import authorize from "../middlewares/authMiddleware";
import FilterController from "../controllers/filterController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Filters
 *     description: Operations related to filters
 */

/**
 * @swagger
 * /filters/{id}:
 *   get:
 *     tags:
 *       - Filters
 *     summary: Get filter data by listing type
 *     description: Retrieve filter data by listing type
 *     parameters:
 *       - in: path
 *         name: listingType
 *         required: true
 *         description: The Listing type
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A filter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 label:
 *                   type: string
 *       404:
 *         description: Unit not found
 *       500:
 *         description: An error occurred
 */
router.get("/filters/:listingType", authorize, FilterController.fetchFilterData);

export default router;
