import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("units_master", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("unitNo").notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("units_master");
}
