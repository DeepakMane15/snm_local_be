import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        CREATE PROCEDURE GetSadhsangat(IN p_id INT)
        BEGIN
            IF p_id = 0 THEN
                SELECT * FROM sadhsangat;
            ELSE
                SELECT * FROM sadhsangat WHERE id = p_id;
            END IF;
        END;
    `);
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`
        DROP PROCEDURE IF EXISTS GetSadhsangat;
    `);
}

