import {
  GetSadhsangatResultModel,
  SadhsangatDataModel,
  SadhsangatInputDataModel,
  SadhsangatMemberInputDataModel,
} from "../models/sadhsangatDataModel";
import db from "../db/knex"; // Adjust path to knex.ts
import redisClient from "../config/redis";
import {
  UnitMasterSortBy,
  SortType,
  RedisKeysConstant,
} from "../common/AppEnum";
import { deleteKeysWithPrefix } from "./redisService";

const createSadhsangat = async (sadhsangatData: SadhsangatInputDataModel) => {
  const {
    name,
    unitNo,
    area,
    address,
    pincode,
    contactNo,
    gender,
    dob,
    qualification,
    occupation,
    dateOfGyan,
    bloodGroup,
    familyId,
    isSewadal,
    personalNo,
    sewadalNo,
    recruitmentDate,
    badgeBeltDate,
    members,
  } = sadhsangatData;

  const age = 20;

  // Delete the keys here
  await deleteKeysWithPrefix(`${RedisKeysConstant.Sadhsangat}:`);
  await deleteKeysWithPrefix(`${RedisKeysConstant.Sewadal}:`);

  try {
    return await db.transaction(async (trx) => {
      let insertedFamilyId = familyId;

      // Insert into sadhsangat table
      const [insertedId] = await trx("sadhsangat")
        .insert({
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
          familyId: familyId > 0 ? familyId : null,
        })
        .returning("id"); // Assuming 'id' is the primary key

      // Handle familyId assignment
      if (!insertedFamilyId || insertedFamilyId === 0) {
        // Insert into family_hof_mapping table
        const [hofId] = await trx("family_hof_mapping")
          .insert({
            hof: insertedId,
          })
          .returning("id");

        // Update sadhsangat with the new familyId
        await trx("sadhsangat")
          .where({ id: insertedId })
          .update({ familyId: hofId });

        insertedFamilyId = hofId;
      }

      // Handle isSewadal condition
      if (isSewadal) {
        // Insert into sewadal table
        await trx("sewadal").insert({
          sId: insertedId,
          personalNo,
          sewadalNo,
          recruitmentDate,
          badgeBeltDate,
        });
      }

      // Insert members
      await Promise.all(
        members.map(async (member: SadhsangatMemberInputDataModel) => {
          const {
            name,
            unitNo,
            contactNo,
            gender,
            dob,
            qualification,
            occupation,
            dateOfGyan,
            bloodGroup,
            isSewadal,
            personalNo,
            sewadalNo,
            recruitmentDate,
            badgeBeltDate,
          } = member;

          // Insert member into sadhsangat table
          await trx("sadhsangat").insert({
            name,
            address,area,pincode,
            unitNo,
            contactNo,
            gender,
            dob,
            age,
            qualification,
            occupation,
            dateOfGyan,
            bloodGroup,
            familyId: insertedFamilyId, // use updated familyId
          });

          // Handle isSewadal condition for members
          if (isSewadal) {
            await trx("sewadal").insert({
              sId: insertedId,
              personalNo,
              sewadalNo,
              recruitmentDate,
              badgeBeltDate,
            });
          }
        })
      );

      // Return the ID of the inserted sadhsangat record
      return insertedId;
    });
  } catch (error) {
    console.error("Error during Sadhsangat creation:", error);
    throw error; // Optionally rethrow the error if needed
  }
};


const getSadhsangat = async (
  unitNo: number,
  pageNo: number,
  limit: number,
  sortBy: UnitMasterSortBy,
  sortType: SortType,
  searchString: string
): Promise<GetSadhsangatResultModel> => {
  unitNo = unitNo > 0 ? unitNo : 1;
  const cacheKey = `${RedisKeysConstant.Sadhsangat}:${unitNo}:${pageNo}:${limit}:${sortBy}:${sortType}:${searchString}`;

  return new Promise((resolve, reject) => {
    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) return reject(err);

      if (cachedData) {
        return resolve(JSON.parse(cachedData));
      } else {
        try {
          // let result: SadhsangatDataModel[];
          let finalResult: GetSadhsangatResultModel = {
            data: [],
            count: 0,
          };
          // Calculate offset based on the current page number and limit
          const offset = (pageNo - 1) * limit;
          //   result = await db.raw(`CALL GetSadhsangat(?);`, [id]);
          const query = db("sadhsangat as S")
            .select(
              "S.*",
              "units_master.unitNo as unitNo",
              "units_master.name as unitName",
              db.raw(
                "CASE WHEN HF.hof IS NOT NULL THEN true ELSE false END as isHOF"
              )
            )
            .leftJoin("family_hof_mapping as HF", "S.id", "=", "HF.hof")
            .leftJoin("units_master", "S.unitNo", "=", "units_master.id")
            .where("S.unitNo", "=", unitNo);

          if (searchString.trim()) {
            query.where("S.name", "like", `%${searchString}%`);
          }

          finalResult.data = await query
            .orderBy(sortBy, sortType)
            .limit(limit)
            .offset(offset);

          const countResult = await getSadhsangatRecordsCount(
            unitNo,
            searchString
          );
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

const updateSadhsangat = async (
  id: number,
  updateData: Partial<SadhsangatDataModel>
) => {
  const existingRecord = await isSadhsangatExists(id);

  if (!existingRecord) {
    return null;
  }
  await deleteKeysWithPrefix(`${RedisKeysConstant.Sadhsangat}:`);
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

  return record as SadhsangatDataModel;
};

const isSadhsangatExists = async (id: number) => {
  const record = await db("sadhsangat").where({ id }).first();
  return record;
};

const deleteSadhsangat = async (id: number): Promise<boolean> => {
  const result = await db("sadhsangat").where("id", id).del();
  await deleteKeysWithPrefix(`${RedisKeysConstant.Sadhsangat}:`);

  return result > 0;
};

const getSadhsangatRecordsCount = async (
  unitNo: number,
  searchString: string
) => {
  const query = db("sadhsangat").where({ unitNo: unitNo });

  if (searchString.trim()) {
    query.where("name", "like", `%${searchString}%`);
  }
  const record = await query.count<{ count: number }>("id as count").first();
  return record;
};

export default {
  createSadhsangat,
  getSadhsangat,
  getSadhsangatById,
  updateSadhsangat,
  deleteSadhsangat,
};
