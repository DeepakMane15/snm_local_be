import express from "express";
import UnitsMasterController from "../controllers/unitsMasterController";
import HOFMappingController from "../controllers/hofMappingController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Unit Master
 *     description: Operations related to unit masters
 */

/**
 * @swagger
 * /hof-mappings:
 *   get:
 *     tags:
 *       - HOF Mapping
 *     summary: Fetch all Head of Family (HOF) mappings
 *     description: Retrieve all Head of Family (HOF) mappings with pagination, sorting, and filtering options.
 *     parameters:
 *       - name: pageNo
 *         in: query
 *         required: true
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: true
 *         description: Number of records per page
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: sortType
 *         in: query
 *         required: false
 *         description: Sort order for the records (asc or desc)
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *     responses:
 *       200:
 *         description: A list of HOF mappings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of HOF records
 *                   example: 100
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                          type: string
 *                          description: Name of Head Of Family (HOF)
 *                          example: John Doe
 *                       familyId:
 *                         type: integer
 *                         description: ID of the family
 *                         example: 1
 *                       hof:
 *                         type: integer
 *                         description: Head of Family identifier
 *                         example: 12345
 *       400:
 *         description: Bad request, invalid parameters
 *       500:
 *         description: Server error
 */
router.get("/hof-mappings", HOFMappingController.fetchAllHOFMappings);

export default router;
