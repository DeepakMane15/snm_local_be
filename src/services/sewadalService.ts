import {
  GetSewadalResultModel,
  SewadalDataModel,
} from "../models/sewadalDataModel";
import db from "../db/knex"; // Adjust path to knex.ts
import redisClient from "../config/redis";
import { SewadalSortBy, SortType, RedisKeysConstant } from "../common/AppEnum";
import { deleteKeysWithPrefix } from "./redisService";

const createSewadal = async (sewadalData: SewadalDataModel) => {
  const { sewadalId, personalNo, sewadalNo, recruitmentDate } = sewadalData;

  // delete the keys here
  await deleteKeysWithPrefix(`${RedisKeysConstant.Sewadal}:`);

  return db.raw(
    `
          CALL InsertIntoSewadal(?, ?, ?, ?);
      `,
    [sewadalId, personalNo, sewadalNo, recruitmentDate]
  );
};

const getSewadal = async (
  unitId: number,
  pageNo: number,
  limit: number,
  sortBy: SewadalSortBy,
  sortType: SortType,
  searchString: string
): Promise<GetSewadalResultModel> => {
  // unitId will be taken from headers
  unitId = unitId > 0 ? unitId : 1;
  const cacheKey = `${RedisKeysConstant.Sewadal}:${unitId}:${pageNo}:${limit}:${sortBy}:${sortType}:${searchString}`;

  return new Promise((resolve, reject) => {
    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) return reject(err);

      if (cachedData) {
        return resolve(JSON.parse(cachedData));
      } else {
        try {
          let finalResult = new GetSewadalResultModel();
          const offset = (pageNo - 1) * limit;

          let query = db("sewadal as SD")
            .select("SG.*", "SD.*")
            .join("sadhsangat as SG", "SG.id", "=", "SD.sId")
            .where("SG.unitNo", "=", unitId);

            if(searchString.trim()) {
              query.where("SG.name", "like", `%${searchString}%`);
            }

            finalResult.data = await query.orderBy(sortBy, sortType)
            .limit(limit)
            .offset(offset);
          const countResult = await getSewadalRecordsCount(unitId, searchString);
          if (countResult) finalResult.count = countResult.count;
          redisClient.setex(cacheKey, 3600, JSON.stringify(finalResult)); // Cache for 1 hour
          resolve(finalResult);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};

const updateSewadal = async (
  id: number,
  updateData: Partial<SewadalDataModel>
) => {
  const existingRecord = await isSewadalExists(id);

  if (!existingRecord) {
    return null;
  }
  await deleteKeysWithPrefix(`${RedisKeysConstant.Sewadal}:`);
  return await db("sewadal").where({ id }).update(updateData);
};

const getSewadalById = async (id: number): Promise<SewadalDataModel> => {
  const record = await db("sewadal")
    .select("sewadal.*", "sadhsangat.sID as sID", "sadhsangat.name as sName")
    .leftJoin("sadhsangat", "sewadal.sID", "=", "sadhsangat.id") // Join the sadhsangat table on sID
    .where("sewadal.id", id)
    .first();

  return record as SewadalDataModel;
};

const isSewadalExists = async (id: number): Promise<boolean> => {
  const record = await db("sewadal").where({ id }).first();
  return record;
};

const deleteSewadal = async (id: number): Promise<boolean> => {
  const result = await db("sewadal").where("id", id).del();
  await deleteKeysWithPrefix(`${RedisKeysConstant.Sewadal}:`);

  return result > 0;
};

const getSewadalRecordsCount = async (unitId: number, searchString: string) => {
  const query = db("sewadal as SD")
    .join("sadhsangat as SG", "SG.id", "=", "SD.sId")
    .where("SG.unitNo", "=", unitId);

  if (searchString.trim()) {
    query.where("SG.name", "like", `%${searchString}%`);
  }
  const record = await query.count<{ count: number }>("SD.id as count").first();
  return record;
};

export default {
  createSewadal,
  getSewadal,
  getSewadalById,
  updateSewadal,
  deleteSewadal,
};
