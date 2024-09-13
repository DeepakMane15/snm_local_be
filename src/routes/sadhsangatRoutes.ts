import express from "express";
import sadhsangatController from "../controllers/sadhsangatController";
import validateSadhsangat from "../middlewares/validateSadhsangat";
import authorize from "../middlewares/authMiddleware";

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
 *               unitNo:
 *                 type: integer
 *               familyId:
 *                 type: integer
 *               isSewadal:
 *                 type: boolean
 *               personalNo:
 *                 type: integer
 *               sewadalNo:
 *                 type: integer
 *               recruitmentDate:
 *                 type: string
 *               badgeBeltDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Validation error
 */
router.post(
  "/sadhsangat",
  authorize,
  validateSadhsangat,
  sadhsangatController.createSadhsangat
);

/**
 * @swagger
 * /sadhsangat:
 *   get:
 *     summary: Get paginated Sadhsangat records
 *     tags:
 *       - Sadhsangat
 *     parameters:
 *       - name: unitId
 *         in: query
 *         required: true
 *         description: ID of the Sadhsangat unit
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageNo
 *         in: query
 *         required: true
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: true
 *         description: Number of records per page
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sortBy
 *         in: query
 *         required: false
 *         description: Column to sort by
 *         schema:
 *           type: string
 *           enum: [name]
 *           default: name
 *       - name: sortType
 *         in: query
 *         required: false
 *         description: Sort type
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *     responses:
 *       200:
 *         description: Sadhsangat records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of Sadhsangat records
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
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
 *       400:
 *         description: Invalid query parameters
 *       404:
 *         description: Sadhsangat records not found
 *       500:
 *         description: Server error
 */
router.get("/sadhsangat", authorize, sadhsangatController.fetchSadhsangat);

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
router.get("/sadhsangatById/:id",authorize, sadhsangatController.fetchSadhsangatById);


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
 *               isHOF:
 *                  type: boolean
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
  authorize,
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
router.delete("/sadhsangat/:id", authorize, sadhsangatController.deleteSadhsangat);

export default router;
