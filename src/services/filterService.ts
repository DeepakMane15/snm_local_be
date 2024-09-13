import {
  listingType,
  RedisKeysConstant,
  SortType,
  UnitMasterSortBy,
} from "../common/AppEnum";
import redisClient from "../config/redis";
import db from "../db/knex"; // Adjust path to knex.ts
import { FilterDataModel } from "../models/filterDataModel";

const getFilters = async (listingType: string): Promise<FilterDataModel[]> => {
  let cacheKey = `${RedisKeysConstant.SewadalListFilter}:${listingType}`;
  return new Promise((resolve, reject) => {
    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) return reject(err);

      if (cachedData) {
        return resolve(JSON.parse(cachedData));
      } else {
        try {
          let filterData: FilterDataModel[] = await db("units_master as U")
            .select(
              "U.id as id",
              db.raw(`CONCAT(U.name, ' (', U.unitNo, ')') as label`)
            )
            .orderBy("U.id", "asc");
          redisClient.setex(cacheKey, 3600, JSON.stringify(filterData)); // Cache for 1 hour
          resolve(filterData);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};

export default { getFilters };
