import express from "express";
import UnitsMasterController from "../controllers/unitsMasterController";
import FamilyMemberController from "../controllers/familyMemberController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Unit Master
 *     description: Operations related to unit masters
 */

/**
 * @swagger
 * /family-members:
 *   get:
 *     tags:
 *       - Family Members
 *     summary: Retrieve family members
 *     description: Fetch family members based on familyId and sortType
 *     parameters:
 *       - name: familyId
 *         in: query
 *         required: true
 *         description: Family ID to filter the records
 *         schema:
 *           type: integer
 *       - name: sortType
 *         in: query
 *         required: true
 *         description: Sorting order for the records (asc or desc)
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: List of family members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   unitNo:
 *                     type: integer
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
 *                   familyId:
 *                     type: integer
 *                   isHOF:
 *                     type: boolean
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.get("/family-members", FamilyMemberController.fetchAllFamilyMembers);

export default router;
