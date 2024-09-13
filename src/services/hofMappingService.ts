import { RedisKeysConstant, SortType, UnitMasterSortBy } from "../common/AppEnum";
import redisClient from "../config/redis";
import db from "../db/knex"; // Adjust path to knex.ts
import { GetHOFResultModel, HOFDataModel } from "../models/hofDataModel";

const getHOFMappings = async (pageNo: number, limit: number, sortType: SortType): Promise<GetHOFResultModel> => {
  let cacheKey = `${RedisKeysConstant.HOFMapping}:${pageNo}:${limit}:${sortType}`;
  return new Promise((resolve, reject) => {
    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) return reject(err);

      if (cachedData) {
        return resolve(JSON.parse(cachedData));
      } else {
        try {
          const offset = (pageNo - 1) * limit;
          let hofMappingData = new GetHOFResultModel();
          hofMappingData.data = await db("family_hof_mapping as F")
          .select("F.id as familyId", "F.hof", "S.name")
          .join("sadhsangat as S", "S.id", "=", "F.hof")
          .orderBy("F.id", sortType)
          .limit(limit)
          .offset(offset);
          const countResult = await getHOFMappingRecordsCount();
          if(countResult)
            hofMappingData.count = countResult.count;
          redisClient.setex(cacheKey, 3600, JSON.stringify(hofMappingData)); // Cache for 1 hour
          resolve(hofMappingData);
        }
        catch (error) {
          reject(error);
        }
      }
    });
  });
};

const getHOFMappingRecordsCount = async () => {
  const record = await db("family_hof_mapping")
  .count<{count: number}>("id as count")
  .first();
  return record;
};

export default { getHOFMappings };
