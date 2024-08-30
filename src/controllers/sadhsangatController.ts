import { Request, Response } from 'express';
import sadhsangatService from '../services/sadhsangatService';
import logger from '../utils/winston';
import { GetSadhsangatResultModel, SadhsangatDataModel } from '../models/sadhsangatDataModel';
import { SortType, UnitMasterSortBy } from '../common/AppEnum';

const createSadhsangat = async (req: Request, res: Response) => {
    try {
        logger.info(`Create Sadhsangat record IN`);
        const sadhsangatData = req.body;
        const result = await sadhsangatService.createSadhsangat(sadhsangatData);
        logger.info(`Create Sadhsangat record OUT`);
        res.status(201).json({ message: 'Record inserted successfully', id: result[0] });
    } catch (error) {
        logger.error(`Error creating Sadhsangat record: - ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchSadhsangat = async (req: Request, res: Response) => {
    try {
        logger.info(`Fetch Sadhsangat records IN`);
        const id = parseInt(req.query.id as string, 10);
        const pageNo = parseInt(req.query.pageNo as string, 10);
        const limit = parseInt(req.query.limit as string, 10);
        const sortBy = (req.query.sortBy as UnitMasterSortBy) || UnitMasterSortBy.name;
        const sortType = (req.query.sortType as SortType) || SortType.asc;
        const result: GetSadhsangatResultModel = await sadhsangatService.getSadhsangat(id, pageNo, limit, sortBy, sortType);
        logger.info(`Fetch Sadhsangat records Out`);
        res.status(201).json({ message: 'Record fetched successfully', data: result });
    } catch (error) {
        logger.error(`Error fetching Sadhsangat record: - ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchSadhsangatById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        logger.info(`Fetch Sadhsangat by id record IN for id: ${id}`);
        const result: any = await sadhsangatService.getSadhsangatById(id);
        logger.info(`Fetch Sadhsangat by id record OUT for id: ${id}`);
        res.status(201).json({ message: 'Record fetched successfully', data: result});
    } catch (error) {
        logger.error(`Error fetching Sadhsangat record by id: - ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateSadhsangat = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        logger.info(`Updating Sadhsangat record IN for id: ${id}`);
        const updateData = req.body;
        
        const updated = await sadhsangatService.updateSadhsangat(id, updateData);

        if (updated) {
            logger.info(`Updated Sadhsangat record for id: ${id}`);
            return res.status(200).json({ message: 'Sadhsangat record updated successfully' });
        } else {
            logger.warn(`Sandhsangat record does not exist for id: ${id}`);
            return res.status(404).json({ message: 'Sadhsangat record not found' });
        }
    } catch (error) {
        logger.error(`Error updating Sadhsangat record: - ${error}`);
        return res.status(500).json({ message: 'Error updating Sadhsangat record', error });
    }
};


const deleteSadhsangat = async (req: Request, res: Response) => {
    const { id } = req.params;
    logger.info(`Deleting Sadhsangat record IN for id: ${id}`);

    try {
        const result = await sadhsangatService.deleteSadhsangat(Number(id));
        if (result) {
            logger.info(`Deleted Sadhsangat record for id: ${id}`);
            return res.status(200).json({ message: 'Sadhsangat record deleted successfully.' });
        } else {
            logger.warn(`Sandhsangat record does not exist for id: ${id}`);
            return res.status(404).json({ message: 'Sadhsangat record not found.' });
        }
    } catch (error) {
        logger.error(`Error deleting Sadhsangat record: - ${error}`);
        return res.status(500).json({ message: 'Error deleting Sadhsangat record.', error });
    }
};

export default {
    createSadhsangat,fetchSadhsangat, fetchSadhsangatById, updateSadhsangat, deleteSadhsangat
};
