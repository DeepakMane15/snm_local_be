import redisClient from "../config/redis";
import db from "../db/knex"; // Adjust path to knex.ts
import { UnitsMasterDataModel } from "../models/unitsMasterDataModel";

const insertUnit = async (unitData: UnitsMasterDataModel) => {
  return await db("units_master").insert(unitData);
};

const getUnits = async () => {
  let cacheKey = 'units'
  return new Promise((resolve, reject) => {
    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) return reject(err);

      if (cachedData) {
        return resolve(JSON.parse(cachedData));
      } else {
        try {
          let units:UnitsMasterDataModel[] = await db("units_master").select("*");
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

export default { insertUnit, getUnits, getUnitById };
