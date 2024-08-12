import { SadhsangatDataModel } from "../models/sadhsangatDataModel";
import db from '../db/knex'; // Adjust path to knex.ts


const createSadhsangat = async (sadhsangatData: SadhsangatDataModel) => {
    const { name, unitNo, area, address, pincode, contactNo, gender, dob, age, qualification, occupation, dateOfGyan, bloodGroup } = sadhsangatData;

    return db.raw(`
        CALL InsertIntoSadhsangat(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [name, unitNo, area, address, pincode, contactNo, gender, dob, age, qualification, occupation, dateOfGyan, bloodGroup]);
};

const getSadhsangat = async (id: number) => {
    return db.raw(`
        CALL GetSadhsangat(?);
    `, [id]);
};

const updateSadhsangat = async (id: number, updateData: Partial<SadhsangatDataModel>) => {
    const existingRecord = await getById(id);

    if (!existingRecord) {
        return null;
    }
    return await db('sadhsangat').where({ id }).update(updateData);
};

const getById = async (id: number) => {
    const record = await db('sadhsangat').where({ id }).first();
    return record;
};

const deleteSadhsangat = async (id: number): Promise<boolean> => {
    const result = await db('sadhsangat')
        .where('id', id)
        .del();

    return result > 0;
};


export default {
    createSadhsangat,getSadhsangat, updateSadhsangat, deleteSadhsangat
};
