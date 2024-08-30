import { Router } from 'express';
import sewadalController from '../controllers/sewadalController';

const router = Router();

/**
 * @swagger
 * /sewadal:
 *   post:
 *     tags:
 *       - Sewadal
 *     summary: Create a new Sewadal record
 *     description: Creates a new Sewadal record in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sID:
 *                 type: integer
 *               personalNo:
 *                 type: integer
 *               sewadalNo:
 *                 type: string
 *               recruitmentDate:
 *                 type: string
 *                 format: date
 *             required:
 *               - sID
 *               - recruitmentDate
 *     responses:
 *       201:
 *         description: Record inserted successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/', sewadalController.createSewadal);

/**
 * @swagger
 * /sewadal:
 *   get:
 *     tags:
 *       - Sewadal
 *     summary: Fetch Sewadal records
 *     description: Retrieve Sewadal records from the database with pagination and sorting.
 *     parameters:
 *       - name: sID
 *         in: query
 *         required: true
 *         description: Sadhsangat ID to filter the records
 *         schema:
 *           type: integer
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
 *         schema:
 *           type: integer
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
 *     responses:
 *       200:
 *         description: A list of Sewadal records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of Sewadal records
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       sID:
 *                         type: integer
 *                       personalNo:
 *                         type: integer
 *                       sewadalNo:
 *                         type: string
 *                       recruitmentDate:
 *                         type: string
 *                         format: date
 *                       name:
 *                         type: string
 *                       unitNo:
 *                         type: integer
 *                       area:
 *                         type: string
 *                       address:
 *                         type: string
 *                       pincode:
 *                         type: string
 *                       contactNo:
 *                         type: string
 *                       gender:
 *                         type: integer
 *                       dob:
 *                         type: string
 *                         format: date
 *                       age:
 *                         type: integer
 *                       qualification:
 *                         type: string
 *                       occupation:
 *                         type: string
 *                       dateOfGyan:
 *                         type: string
 *                         format: date
 *                       bloodGroup:
 *                         type: string
 *       500:
 *         description: Internal Server Error
 */
router.get('/', sewadalController.fetchSewadal);

/**
 * @swagger
 * /sewadal/{id}:
 *   get:
 *     tags:
 *       - Sewadal
 *     summary: Fetch Sewadal record by ID
 *     description: Retrieve a specific Sewadal record from the database by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Sewadal record to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sewadal record fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 sID:
 *                   type: integer
 *                 personalNo:
 *                   type: integer
 *                 sewadalNo:
 *                   type: string
 *                 recruitmentDate:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Sewadal record not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', sewadalController.fetchSewadalById);

/**
 * @swagger
 * /sewadal/{id}:
 *   put:
 *     tags:
 *       - Sewadal
 *     summary: Update a Sewadal record
 *     description: Updates an existing Sewadal record in the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Sewadal record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personalNo:
 *                 type: integer
 *               sewadalNo:
 *                 type: string
 *               recruitmentDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Sewadal record updated successfully
 *       404:
 *         description: Sewadal record not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', sewadalController.updateSewadal);

/**
 * @swagger
 * /sewadal/{id}:
 *   delete:
 *     tags:
 *       - Sewadal
 *     summary: Delete a Sewadal record
 *     description: Deletes an existing Sewadal record from the database by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Sewadal record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sewadal record deleted successfully
 *       404:
 *         description: Sewadal record not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', sewadalController.deleteSewadal);

export default router;
