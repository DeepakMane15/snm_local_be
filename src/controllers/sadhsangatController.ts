import { Request, Response } from 'express';
import sadhsangatService from '../services/sadhsangatService';

const createSadhsangat = async (req: Request, res: Response) => {
    try {
        const sadhsangatData = req.body;
        const result = await sadhsangatService.createSadhsangat(sadhsangatData);
        res.status(201).json({ message: 'Record inserted successfully', id: result[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchSadhsangat = async (req: Request, res: Response) => {
    try {
        const id = req.query.id ? Number(req.query.id) : 0;
        const result = await sadhsangatService.getSadhsangat(id);
        res.status(201).json({ message: 'Record fetched successfully', id: result[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default {
    createSadhsangat,fetchSadhsangat
};
