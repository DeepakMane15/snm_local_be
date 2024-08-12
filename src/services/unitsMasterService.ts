import db from "../db/knex"; // Adjust path to knex.ts
import { UnitsMasterDataModel } from "../models/unitsMasterDataModel";

const insertUnit = async (unitData: UnitsMasterDataModel) => {
  return await db("units_master").insert(unitData);
};

const getUnits = async () => {
  return await db("units_master").select("*");
};

const getUnitById = async (id: number) => {
  return await db("units_master").where({ id }).first();
};

export default { insertUnit, getUnits, getUnitById };
