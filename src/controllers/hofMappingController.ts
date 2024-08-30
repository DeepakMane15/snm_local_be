import { Request, Response } from "express";
import logger from "../utils/winston";
import {
  GetUnitsMasterResultModel,
  UnitsMasterDataModel,
} from "../models/unitsMasterDataModel";
import { SortType, UnitMasterSortBy } from "../common/AppEnum";
import HOFMappingService from "../services/hofMappingService";
import { GetHOFResultModel } from "../models/hofDataModel";

const fetchAllHOFMappings = async (req: Request, res: Response) => {
  try {
    logger.info(`Fetching HOF Mapping record by id IN`);
    const pageNo = parseInt(req.query.pageNo as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const sortType = (req.query.sortType as SortType) || SortType.asc;
    const hofMappings: GetHOFResultModel = await HOFMappingService.getHOFMappings(
      pageNo,
      limit,
      sortType
    );
    logger.info(`Fetching HOF Mapping record by id OUT`);
    res
      .status(200)
      .json({ message: "HOF Mapping fetched successfully", data: hofMappings });
  } catch (error) {
    logger.error(`Error fetching HOF Mapping record: - ${error}`);
    res.status(500).json({ error: "An error occurred while fetching HOF Mapping" });
  }
};

export default {
  fetchAllHOFMappings
};
