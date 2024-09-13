import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('sewadal', function (table) {
        table.date('badgeBeltDate').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("sewadal", function (table) {
        table.dropColumn("badgeBeltDate"); // Rollback to remove the column
    });
}

