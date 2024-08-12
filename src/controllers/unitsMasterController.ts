import { Request, Response } from 'express';
import UnitsMasterService from '../services/unitsMasterService';

const createUnit = async (req: Request, res: Response) => {
  try {
    const unitData = req.body;
    await UnitsMasterService.insertUnit(unitData);
    res.status(201).json({ message: 'Unit created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the unit' });
  }
};

const fetchAllUnits = async (req: Request, res: Response) => {
  try {
    const units = await UnitsMasterService.getUnits();
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching units' });
  }
};

const fetchUnitById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const unit = await UnitsMasterService.getUnitById(parseInt(id, 10));
    if (unit) {
      res.status(200).json(unit);
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the unit' });
  }
};

export default {
  createUnit,
  fetchAllUnits,
  fetchUnitById
};
