import { RedisKeysConstant, SortType, UnitMasterSortBy } from "../common/AppEnum";
import redisClient from "../config/redis";
import db from "../db/knex"; // Adjust path to knex.ts
import { GetUnitsMasterResultModel, UnitsMasterDataModel } from "../models/unitsMasterDataModel";
import { deleteKeysWithPrefix } from "./redisService";

const insertUnit = async (unitData: UnitsMasterDataModel) => {
  await deleteKeysWithPrefix(`${RedisKeysConstant.Unit}:`);
  await deleteKeysWithPrefix(`${RedisKeysConstant.SewadalListFilter}:`);
  return await db("units_master").insert(unitData);
};

const getUnits = async (pageNo: number, limit: number, sortBy: UnitMasterSortBy, sortType: SortType): Promise<GetUnitsMasterResultModel> => {
  let cacheKey = `${RedisKeysConstant.Unit}:${pageNo}:${limit}:${sortBy}:${sortType}`;
  return new Promise((resolve, reject) => {
    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) return reject(err);

      if (cachedData) {
        return resolve(JSON.parse(cachedData));
      } else {
        try {
          const offset = (pageNo - 1) * limit;
          let units = new GetUnitsMasterResultModel();
          units.data = await db("units_master")
          .select("*")
          .orderBy(sortBy, sortType)
          .limit(limit)
          .offset(offset);
          const countResult = await getUnitsRecordsCount();
          if(countResult)
            units.count = countResult.count;
          redisClient.setex(cacheKey, 3600, JSON.stringify(units)); // Cache for 1 hour
          resolve(units);
        }
        catch (error) {
          reject(error);
        }
      }
    });
  });
};

const getUnitById = async (id: number) => {
  return await db("units_master").where({ id }).first();
};

const getUnitsRecordsCount = async () => {
  const record = await db("units_master")
  .count<{count: number}>("id as count")
  .first();
  return record;
};

export default { insertUnit, getUnits, getUnitById };
