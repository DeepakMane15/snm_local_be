import { Request, Response } from "express";
import logger from "../utils/winston";
import { SortType, UnitMasterSortBy } from "../common/AppEnum";
import FamilyMemberService from "../services/familyMemberService";
import { GetHOFResultModel } from "../models/hofDataModel";
import { SadhsangatDataModel } from "../models/sadhsangatDataModel";

const fetchAllFamilyMembers = async (req: Request, res: Response) => {
  try {
    logger.info(`Fetching Family Members record by id IN`);
    const familyId = parseInt(req.query.familyId as string, 10);
    const sortType = (req.query.sortType as SortType) || SortType.asc;
    const familyMembers: SadhsangatDataModel[] =
      await FamilyMemberService.fetchAllFamiliMembers(familyId, sortType);
    logger.info(`Fetching Family Members record by id OUT`);
    res
      .status(200)
      .json({
        message: "Family Members fetched successfully",
        data: familyMembers,
      });
  } catch (error) {
    logger.error(`Error fetching Family Members record: - ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred while fetching Family Members" });
  }
};

export default {
  fetchAllFamilyMembers,
};
