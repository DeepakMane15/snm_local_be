import { Request, Response } from "express";
import logger from "../utils/winston";
import FilterService from "../services/filterService";
import { FilterDataModel } from "../models/filterDataModel";
import { listingType } from "../common/AppEnum";

const fetchFilterData = async (req: Request, res: Response) => {
  try {
    const { listingType } = req.params;
    logger.info(`Fetching Filter record for listing type ${listingType} IN`);

    const filterData: FilterDataModel[] = await FilterService.getFilters(
      listingType
    );
    logger.info(`Fetching Filter record for listing type ${listingType} OUT`);
    res
      .status(200)
      .json({ message: "Filter record fetched successfully", data: filterData });
  } catch (error) {
    logger.error(`Error fetching Filter record: - ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred while fetching Filter record" });
  }
};

export default {
  fetchFilterData,
};
