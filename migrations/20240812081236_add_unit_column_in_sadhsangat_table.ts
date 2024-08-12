import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('sadhsangat', function (table) {
        table.integer('unitNo').unsigned().notNullable(); // Match this with unit_masters.id
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("sadhsangat", function (table) {
    table.dropColumn("unitNo"); // Rollback to remove the column
  });
}
