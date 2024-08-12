import { Request, Response } from 'express';
import sadhsangatService from '../services/sadhsangatService';
import { SadhsangatDataModel } from '../models/sadhsangatDataModel';

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
        const id = parseInt(req.params.id, 10);
        const result: any = await sadhsangatService.getSadhsangat(id);
        res.status(201).json({ message: 'Record fetched successfully', data: (result && result.length) ? result : null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchSadhsangatById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result: any = await sadhsangatService.getSadhsangatById(id);
        res.status(201).json({ message: 'Record fetched successfully', data: result});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateSadhsangat = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updateData = req.body;
        
        const updated = await sadhsangatService.updateSadhsangat(id, updateData);

        if (updated) {
            return res.status(200).json({ message: 'Sadhsangat record updated successfully' });
        } else {
            return res.status(404).json({ message: 'Sadhsangat record not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error updating Sadhsangat record', error });
    }
};


const deleteSadhsangat = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await sadhsangatService.deleteSadhsangat(Number(id));
        if (result) {
            return res.status(200).json({ message: 'Sadhsangat record deleted successfully.' });
        } else {
            return res.status(404).json({ message: 'Sadhsangat record not found.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting Sadhsangat record.', error });
    }
};

export default {
    createSadhsangat,fetchSadhsangat, fetchSadhsangatById, updateSadhsangat, deleteSadhsangat
};
