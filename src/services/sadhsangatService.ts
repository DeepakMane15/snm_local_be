import {
  GetSadhsangatDataModel,
  GetSadhsangatResultModel,
  SadhsangatDataModel,
} from "../models/sadhsangatDataModel";
import db from "../db/knex"; // Adjust path to knex.ts
import redisClient from "../config/redis";
import { UnitMasterSortBy, SortType, RedisKeysConstant } from "../common/AppEnum";
import { deleteKeysWithPrefix } from "./redisService";

const createSadhsangat = async (sadhsangatData: SadhsangatDataModel) => {
  const {
    name,
    unitNo,
    area,
    address,
    pincode,
    contactNo,
    gender,
    dob,
    age,
    qualification,
    occupation,
    dateOfGyan,
    bloodGroup,
    familyId
  } = sadhsangatData;

  // delete the keys here
  await deleteKeysWithPrefix(`${RedisKeysConstant.Sadhsangat}:`);

  return db.raw(
    `
        CALL InsertIntoSadhsangat(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      name,
      unitNo,
      area,
      address,
      pincode,
      contactNo,
      gender,
      dob,
      age,
      qualification,
      occupation,
      dateOfGyan,
      bloodGroup,
      familyId
    ]
  );
};

const getSadhsangat = async (unitNo: number, pageNo: number, limit: number, sortBy: UnitMasterSortBy, sortType: SortType): Promise<GetSadhsangatResultModel> => {
  const cacheKey = `${RedisKeysConstant.Sadhsangat}:${unitNo}:${pageNo}:${limit}:${sortBy}:${sortType}`;

  return new Promise((resolve, reject) => {
    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) return reject(err);

      if (cachedData) {
        return resolve(JSON.parse(cachedData));
      } else {
        try {
          // let result: SadhsangatDataModel[];
          let finalResult: GetSadhsangatResultModel = {
            data: [],count: 0
          };
          // Calculate offset based on the current page number and limit
          const offset = (pageNo - 1) * limit;
          //   result = await db.raw(`CALL GetSadhsangat(?);`, [id]);
          finalResult.data = await db("sadhsangat")
            .where({ unitNo: unitNo })
            .orderBy(sortBy, sortType)
            .limit(limit)
            .offset(offset);
          redisClient.setex(cacheKey, 3600, JSON.stringify(finalResult.data)); // Cache for 1 hour
          const countResult = await getSadhsangatRecordsCount(unitNo);
          if(countResult)
            finalResult.count = countResult.count;
          resolve(finalResult);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};

const updateSadhsangat = async (
  id: number,
  updateData: Partial<SadhsangatDataModel>
) => {
  const existingRecord = await isSadhsangatExists(id);

  if (!existingRecord) {
    return null;
  }
  return await db("sadhsangat").where({ id }).update(updateData);
};

const getSadhsangatById = async (id: number) => {
  const record = await db("sadhsangat")
    .select(
      "sadhsangat.*",
      "units_master.unitNo as unitNo",
      "units_master.name as unitName"
    )
    .leftJoin("units_master", "sadhsangat.unitNo", "=", "units_master.id") // Join the units_master table on unitNo
    .where("sadhsangat.id", id)
    .first();

  return record as GetSadhsangatDataModel;
};

const isSadhsangatExists = async (id: number) => {
  const record = await db("sadhsangat").where({ id }).first();
  return record;
};

const deleteSadhsangat = async (id: number): Promise<boolean> => {
  const result = await db("sadhsangat").where("id", id).del();

  return result > 0;
};

const getSadhsangatRecordsCount = async (unitNo: number) => {
  const record = await db("sadhsangat")
  .where({ unitNo: unitNo })
  .count<{count: number}>("id as count")
  .first();
  return record;
};

export default {
  createSadhsangat,
  getSadhsangat,
  getSadhsangatById,
  updateSadhsangat,
  deleteSadhsangat,
};
