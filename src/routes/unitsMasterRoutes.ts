import express from 'express';
import UnitsMasterController from '../controllers/unitsMasterController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Unit Master
 *     description: Operations related to unit masters
 */

/**
 * @swagger
 * /units:
 *   post:
 *     tags:
 *       - Unit Master
 *     summary: Create a new unit
 *     description: Add a new unit to the units_master table
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               unitNo:
 *                 type: string
 *             required:
 *               - name
 *               - unitNo
 *     responses:
 *       201:
 *         description: Unit created successfully
 *       500:
 *         description: An error occurred
 */
router.post('/units', UnitsMasterController.createUnit);

/**
 * @swagger
 * /units:
 *   get:
 *     tags:
 *       - Unit Master
 *     parameters:
 *       - name: pageNo
 *         in: query
 *         required: true
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: true
 *         description: Number of records per page
 *       - name: sortBy
 *         in: query
 *         required: true
 *         description: Sort By column
 *         schema:
 *           type: string
 *       - name: sortType
 *         in: query
 *         required: true
 *         description: Sort type
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *     summary: Get all units
 *     description: Retrieve all units from the units_master table
 *     responses:
 *       200:
 *         description: A list of units
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of Units records
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       unitNo:
 *                         type: string
 *       500:
 *         description: An error occurred
 */
router.get('/units', UnitsMasterController.fetchAllUnits);

/**
 * @swagger
 * /units/{id}:
 *   get:
 *     tags:
 *       - Unit Master
 *     summary: Get a unit by ID
 *     description: Retrieve a single unit from the units_master table by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the unit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A unit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 unitNo:
 *                   type: string
 *       404:
 *         description: Unit not found
 *       500:
 *         description: An error occurred
 */
router.get('/units/:id', UnitsMasterController.fetchUnitById);

export default router;
