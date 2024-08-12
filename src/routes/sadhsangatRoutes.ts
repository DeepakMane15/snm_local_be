import express from 'express';
import sadhsangatController from '../controllers/sadhsangatController';
import validateSadhsangat from '../middlewares/validateSadhsangat';

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
router.post('/sadhsangat', validateSadhsangat, sadhsangatController.createSadhsangat);

/**
 * @swagger
 * /sadhsangat:
 *   get:
 *     summary: Get Sadhsangat records
 *     tags: 
 *       - Sadhsangat
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: ID of the Sadhsangat record to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of Sadhsangat records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   area:
 *                     type: string
 *                   address:
 *                     type: string
 *                   pincode:
 *                     type: string
 *                   contactNo:
 *                     type: string
 *                   gender:
 *                     type: integer
 *                   dob:
 *                     type: string
 *                     format: date
 *                   age:
 *                     type: integer
 *                   qualification:
 *                     type: string
 *                   occupation:
 *                     type: string
 *                   dateOfGyan:
 *                     type: string
 *                     format: date
 *                   bloodGroup:
 *                     type: string
 */
router.get('/sadhsangat', sadhsangatController.fetchSadhsangat);

export default router;
