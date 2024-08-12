
// import knexConfig from '../../knexfile';
// const knexConfig = require('../../knexfile');
import db from '../db/knex'; // Adjust path to knex.ts

export interface SadhsangatDataModel {
    name: string;
    area: string;
    address: string;
    pincode: string;
    contactNo: string;
    gender: number;
    dob: Date;
    age: number;
    qualification: string;
    occupation: string;
    dateOfGyan: Date;
    bloodGroup: string;
}


const insertSadhsangat = async (sadhsangatData: SadhsangatDataModel) => {
    // Construct the call to the stored procedure with parameters
    const { name, area, address, pincode, contactNo, gender, dob, age, qualification, occupation, dateOfGyan, bloodGroup } = sadhsangatData;

    return db.raw(`
        CALL InsertIntoSadhsangat(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [name, area, address, pincode, contactNo, gender, dob, age, qualification, occupation, dateOfGyan, bloodGroup]);
};

const getSadhsangat = async (id: number) => {

    // Construct the call to the stored procedure with parameters
    return db.raw(`
        CALL GetSadhsangat(?);
    `, [id]);
};

const getById = async (id: number) => {
    const record = await db('sadhsangat').where({ id }).first();
    return record;
};

const update = async (id: number, updateData: Partial<SadhsangatDataModel>) => {
    return await db('sadhsangat').where({ id }).update(updateData);
};


const deleteSadhsangat = async (id: number): Promise<boolean> => {
    const result = await db('sadhsangat')
        .where('id', id)
        .del();

    return result > 0;
};

export default {
    insertSadhsangat,getSadhsangat, getById, update, deleteSadhsangat
};
