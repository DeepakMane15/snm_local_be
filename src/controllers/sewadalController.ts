import { Request, Response } from 'express';
import SewadalService from '../services/sewadalService';
import logger from '../utils/winston';
import { GetSewadalResultModel, SewadalDataModel } from '../models/sewadalDataModel';
import { SortType, SewadalSortBy } from '../common/AppEnum';

const createSewadal = async (req: Request, res: Response) => {
    try {
        logger.info(`Create Sewadal record IN`);
        const sewadalData = req.body;
        await SewadalService.createSewadal(sewadalData);
        logger.info(`Create Sewadal record OUT`);
        res.status(201).json({ message: 'Record inserted successfully' });
    } catch (error) {
        logger.error(`Error creating Sewadal record: - ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchSewadal = async (req: Request, res: Response) => {
    try {
        logger.info(`Fetch Sewadal records IN`);
        const pageNo = parseInt(req.query.pageNo as string, 10);
        const limit = parseInt(req.query.limit as string, 10);
        const unitId = parseInt(req.query.unitNo as string, 0);
        const sortBy = (req.query.sortBy as SewadalSortBy) || SewadalSortBy.recruitmentDate;
        const sortType = (req.query.sortType as SortType) || SortType.asc;
        const searchString = (req.query.searchString as string) || "";
        const result: GetSewadalResultModel = await SewadalService.getSewadal(unitId, pageNo, limit, sortBy, sortType, searchString);
        logger.info(`Fetch Sewadal records OUT`);
        res.status(200).json({ message: 'Records fetched successfully', data: result });
    } catch (error) {
        logger.error(`Error fetching Sewadal records: - ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchSewadalById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        logger.info(`Fetch Sewadal by id record IN for id: ${id}`);
        const result: SewadalDataModel = await SewadalService.getSewadalById(id);
        logger.info(`Fetch Sewadal by id record OUT for id: ${id}`);
        res.status(200).json({ message: 'Record fetched successfully', data: result });
    } catch (error) {
        logger.error(`Error fetching Sewadal record by id: - ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateSewadal = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        logger.info(`Updating Sewadal record IN for id: ${id}`);
        const updateData = req.body;
        
        const updated = await SewadalService.updateSewadal(id, updateData);

        if (updated) {
            logger.info(`Updated Sewadal record for id: ${id}`);
            return res.status(200).json({ message: 'Sewadal record updated successfully' });
        } else {
            logger.warn(`Sewadal record does not exist for id: ${id}`);
            return res.status(404).json({ message: 'Sewadal record not found' });
        }
    } catch (error) {
        logger.error(`Error updating Sewadal record: - ${error}`);
        return res.status(500).json({ message: 'Error updating Sewadal record', error });
    }
};

const deleteSewadal = async (req: Request, res: Response) => {
    const { id } = req.params;
    logger.info(`Deleting Sewadal record IN for id: ${id}`);

    try {
        const result = await SewadalService.deleteSewadal(Number(id));
        if (result) {
            logger.info(`Deleted Sewadal record for id: ${id}`);
            return res.status(200).json({ message: 'Sewadal record deleted successfully.' });
        } else {
            logger.warn(`Sewadal record does not exist for id: ${id}`);
            return res.status(404).json({ message: 'Sewadal record not found.' });
        }
    } catch (error) {
        logger.error(`Error deleting Sewadal record: - ${error}`);
        return res.status(500).json({ message: 'Error deleting Sewadal record.', error });
    }
};

export default {
    createSewadal,
    fetchSewadal,
    fetchSewadalById,
    updateSewadal,
    deleteSewadal
};
