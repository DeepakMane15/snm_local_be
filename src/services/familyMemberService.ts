import {
  RedisKeysConstant,
  SortType,
  UnitMasterSortBy,
} from "../common/AppEnum";
import redisClient from "../config/redis";
import db from "../db/knex"; // Adjust path to knex.ts
import { SadhsangatDataModel } from "../models/sadhsangatDataModel";

const fetchAllFamiliMembers = async (
  familyId: number,
  sortType: SortType
): Promise<SadhsangatDataModel[]> => {
  let cacheKey = `${RedisKeysConstant.FamilyMember}:${sortType}`;
  return new Promise((resolve, reject) => {
    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) return reject(err);

      if (cachedData) {
        return resolve(JSON.parse(cachedData));
      } else {
        try {
          let familyMembersData: SadhsangatDataModel[] = await db(
            "sadhsangat as S"
          )
            .select(
              "S.*",
              db.raw(
                "CASE WHEN HF.hof IS NOT NULL THEN true ELSE false END as isHOF"
              )
            )
            .leftJoin("family_hof_mapping as HF", "S.id", "=", "HF.hof")
            .where("S.familyId", "=", familyId)
            .orderBy("S.name", sortType);
          redisClient.setex(cacheKey, 3600, JSON.stringify(familyMembersData)); // Cache for 1 hour
          resolve(familyMembersData);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};

export default { fetchAllFamiliMembers };
