import { SadhsangatDataModel } from "../models/sadhsangatDataModel";
import db from "../db/knex"; // Adjust path to knex.ts
import redisClient from "../config/redis";

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
  } = sadhsangatData;

  return db.raw(
    `
        CALL InsertIntoSadhsangat(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
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
    ]
  );
};

const getSadhsangat = async (id: number) => {
  const cacheKey = id ? `sadhsangat:${id}` : "sadhsangat:all";

  return new Promise((resolve, reject) => {
    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) return reject(err);

      if (cachedData) {
        return resolve(JSON.parse(cachedData));
      } else {
        try {
          let result: SadhsangatDataModel[];
          //   result = await db.raw(`CALL GetSadhsangat(?);`, [id]);
          result = await db("sadhsangat").where({ unitNo: id });
          redisClient.setex(cacheKey, 3600, JSON.stringify(result)); // Cache for 1 hour
          resolve(result);
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
  const existingRecord = await getById(id);

  if (!existingRecord) {
    return null;
  }
  return await db("sadhsangat").where({ id }).update(updateData);
};

const getById = async (id: number) => {
  const record = await db("sadhsangat").where({ id }).first();
  return record;
};

const deleteSadhsangat = async (id: number): Promise<boolean> => {
  const result = await db("sadhsangat").where("id", id).del();

  return result > 0;
};

export default {
  createSadhsangat,
  getSadhsangat,
  updateSadhsangat,
  deleteSadhsangat,
};
