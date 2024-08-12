
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

export default {
    insertSadhsangat,getSadhsangat
};
