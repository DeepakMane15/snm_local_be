import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateSadhsangat = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('unitNo').isInt().notEmpty().withMessage('Unit No is required'),
    body('area').isString().notEmpty().withMessage('Area is required'),
    body('address').isString().notEmpty().withMessage('Address is required'),
    body('pincode').isLength({ min: 1 }).withMessage('Pincode is required'),
    body('contactNo').isLength({ min: 1 }).withMessage('Contact Number is required'),
    body('gender').isInt().withMessage('Gender is required and must be an integer'),
    body('dob').isDate().withMessage('Date of Birth must be a valid date'),
    body('qualification').isString().notEmpty().withMessage('Qualification is required'),
    body('occupation').isString().notEmpty().withMessage('Occupation is required'),
    body('dateOfGyan').isDate().withMessage('Date of Gyan must be a valid date'),
    body('bloodGroup').isString().notEmpty().withMessage('Blood Group is required'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateSadhsangat;
