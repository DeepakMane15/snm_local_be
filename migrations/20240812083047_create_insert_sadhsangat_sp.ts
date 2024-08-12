import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        CREATE PROCEDURE InsertIntoSadhsangat(
            IN _name VARCHAR(255),
            IN _unitNo INT,
            IN _area VARCHAR(255),
            IN _address VARCHAR(255),
            IN _pincode VARCHAR(10),
            IN _contactNo VARCHAR(15),
            IN _gender INT,
            IN _dob DATE,
            IN _age INT,
            IN _qualification VARCHAR(255),
            IN _occupation VARCHAR(255),
            IN _dateOfGyan DATE,
            IN _bloodGroup VARCHAR(10)
        )
        BEGIN
            INSERT INTO sadhsangat (
                name, area, address, pincode, contactNo, gender, dob, age,
                qualification, occupation, dateOfGyan, bloodGroup, unitNo
            )
            VALUES (
                _name, _area, _address, _pincode, _contactNo, _gender,
                _dob, _age, _qualification, _occupation, _dateOfGyan, _bloodGroup, _unitNo
            );
        END;

    `);
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`
        DROP PROCEDURE IF EXISTS InsertIntoSadhsangat;
    `);
}

