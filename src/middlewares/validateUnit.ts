import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateUnit = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('unitNo').isInt().notEmpty().withMessage('Unit No is required'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateUnit;
