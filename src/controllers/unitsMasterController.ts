import { Request, Response } from "express";
import UnitsMasterService from "../services/unitsMasterService";
import logger from "../utils/winston";
import {
  GetUnitsMasterResultModel,
  UnitsMasterDataModel,
} from "../models/unitsMasterDataModel";
import { SortType, UnitMasterSortBy } from "../common/AppEnum";

const createUnit = async (req: Request, res: Response) => {
  try {
    logger.info(`Creating Unit record by id IN`);
    const unitData = req.body;
    await UnitsMasterService.insertUnit(unitData);
    logger.info(`Creating Unit record by id OUT`);
    res.status(201).json({ message: "Unit created successfully" });
  } catch (error: any) {
    logger.error(`Error creating Unit record: - ${error}`);
    res
      .status(error.statusCode || 500)
      .json({
        error:
          error.code === "ER_DUP_ENTRY"
            ? "A unit with the same unitNo already exists"
            : "An error occurred while creating the unit",
      });
  }
};

const fetchAllUnits = async (req: Request, res: Response) => {
  try {
    logger.info(`Fetching Unit record by id IN`);
    const pageNo = parseInt(req.query.pageNo as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const sortBy =
      (req.query.sortBy as UnitMasterSortBy) || UnitMasterSortBy.name;
    const sortType = (req.query.sortType as SortType) || SortType.asc;
    const units: GetUnitsMasterResultModel = await UnitsMasterService.getUnits(
      pageNo,
      limit,
      sortBy,
      sortType
    );
    logger.info(`Fetching Unit record by id OUT`);
    res
      .status(200)
      .json({ message: "Units fetched successfully", data: units });
  } catch (error) {
    logger.error(`Error fetching Units record: - ${error}`);
    res.status(500).json({ error: "An error occurred while fetching units" });
  }
};

const fetchUnitById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info(`Fetching Unit record by id IN for id: ${id}`);
    const unit = await UnitsMasterService.getUnitById(parseInt(id, 10));
    if (unit) {
      logger.info(`Fetching Unit record by id OUT for id: ${id}`);
      res
        .status(200)
        .json({ message: "Unit fetched successfully", data: unit });
    } else {
      logger.warn(`Unit record does not exist for id: ${id}`);
      res.status(404).json({ message: "Unit not found" });
    }
  } catch (error) {
    logger.error(`Error fetching Unit record by id: - ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the unit" });
  }
};

export default {
  createUnit,
  fetchAllUnits,
  fetchUnitById,
};
