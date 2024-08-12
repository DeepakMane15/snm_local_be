import express from "express";
import sadhsangatController from "../controllers/sadhsangatController";
import validateSadhsangat from "../middlewares/validateSadhsangat";

const router = express.Router();

/**
 * @swagger
 * /sadhsangat:
 *   post:
 *     summary: Create a new Sadhsangat record
 *     tags:
 *       - Sadhsangat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               area:
 *                 type: string
 *               address:
 *                 type: string
 *               pincode:
 *                 type: string
 *               contactNo:
 *                 type: string
 *               gender:
 *                 type: integer
 *               dob:
 *                 type: string
 *                 format: date
 *               age:
 *                 type: integer
 *               qualification:
 *                 type: string
 *               occupation:
 *                 type: string
 *               dateOfGyan:
 *                 type: string
 *                 format: date
 *               bloodGroup:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Validation error
 */
router.post(
  "/sadhsangat",
  validateSadhsangat,
  sadhsangatController.createSadhsangat
);

/**
 * @swagger
 * /sadhsangat/{id}:
 *   get:
 *     summary: Get a specific Sadhsangat record by ID
 *     tags:
 *       - Sadhsangat
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Sadhsangat record to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sadhsangat record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 area:
 *                   type: string
 *                 address:
 *                   type: string
 *                 pincode:
 *                   type: string
 *                 contactNo:
 *                   type: string
 *                 gender:
 *                   type: integer
 *                 dob:
 *                   type: string
 *                   format: date
 *                 age:
 *                   type: integer
 *                 qualification:
 *                   type: string
 *                 occupation:
 *                   type: string
 *                 dateOfGyan:
 *                   type: string
 *                   format: date
 *                 bloodGroup:
 *                   type: string
 *       404:
 *         description: Sadhsangat record not found
 *       500:
 *         description: Server error
 */
router.get("/sadhsangat/:id", sadhsangatController.fetchSadhsangat);

/**
 * @swagger
 * /sadhsangatById/{id}:
 *   get:
 *     summary: Get a specific Sadhsangat record by ID
 *     tags:
 *       - Sadhsangat
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Sadhsangat record to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sadhsangat record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 area:
 *                   type: string
 *                 address:
 *                   type: string
 *                 pincode:
 *                   type: string
 *                 contactNo:
 *                   type: string
 *                 gender:
 *                   type: integer
 *                 dob:
 *                   type: string
 *                   format: date
 *                 age:
 *                   type: integer
 *                 qualification:
 *                   type: string
 *                 occupation:
 *                   type: string
 *                 dateOfGyan:
 *                   type: string
 *                   format: date
 *                 bloodGroup:
 *                   type: string
 *       404:
 *         description: Sadhsangat record not found
 *       500:
 *         description: Server error
 */
router.get("/sadhsangatById/:id", sadhsangatController.fetchSadhsangatById);


/**
 * @swagger
 * /sadhsangat/{id}:
 *   put:
 *     summary: Update a Sadhsangat record
 *     tags:
 *       - Sadhsangat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Sadhsangat record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               area:
 *                 type: string
 *               address:
 *                 type: string
 *               pincode:
 *                 type: string
 *               contactNo:
 *                 type: string
 *               gender:
 *                 type: integer
 *               dob:
 *                 type: string
 *                 format: date
 *               age:
 *                 type: integer
 *               qualification:
 *                 type: string
 *               occupation:
 *                 type: string
 *               dateOfGyan:
 *                 type: string
 *                 format: date
 *               bloodGroup:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Record not found
 */
router.put(
  "/sadhsangat/:id",
  validateSadhsangat,
  sadhsangatController.updateSadhsangat
);

/**
 * @swagger
 * /sadhsangat/{id}:
 *   delete:
 *     summary: Delete a Sadhsangat record
 *     tags:
 *       - Sadhsangat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Sadhsangat record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Record not found
 */
router.delete("/sadhsangat/:id", sadhsangatController.deleteSadhsangat);

export default router;
