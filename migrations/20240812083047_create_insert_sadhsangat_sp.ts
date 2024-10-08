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
            IN _bloodGroup VARCHAR(10),
            IN _familyId INT,
            IN _isSewadal INT,
            IN _personalNo INT,
            IN _sewadalNo VARCHAR(50),
            IN _recruitmentDate DATE
        )
        BEGIN

        declare familyId INT default NULL;

        IF(_familyId > 0)
        THEN
            SET familyId = _familyId;
        END IF;

            INSERT INTO sadhsangat (
                name, area, address, pincode, contactNo, gender, dob, age,
                qualification, occupation, dateOfGyan, bloodGroup, unitNo,
                familyId
            )
            VALUES (
                _name, _area, _address, _pincode, _contactNo, _gender,
                _dob, _age, _qualification, _occupation, _dateOfGyan, _bloodGroup, _unitNo, familyId
            );

        IF(familyId is NULL or familyId = 0)
        THEN
        SET @lastInsertId = LAST_INSERT_ID();
        INSERT INTO family_hof_mapping (hof) VALUES (@lastInsertId);

        SET familyId = LAST_INSERT_ID();
        UPDATE sadhsangat SET familyId = familyId WHERE id = @lastInsertId;

        END IF;

        IF (_isSewadal = 1)
        THEN
            INSERT INTO sewadal(sId, personalNo, sewadalNo, recruitmentDate)
            values
            (@lastInsertId, _personalNo, _sewadalNo, _recruitmentDate);
        END IF;
        END;

    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP PROCEDURE IF EXISTS InsertIntoSadhsangat;
    `);
}
