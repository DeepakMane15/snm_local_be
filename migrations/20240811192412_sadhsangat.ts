import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("sadhsangat", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("area").notNullable();
    table.string("address").notNullable();
    table.integer("pincode").notNullable();
    table.string("contactNo").notNullable();
    table.integer("gender").notNullable();
    table.date("dob").notNullable();
    table.integer("age").notNullable();
    table.string("qualification").notNullable();
    table.string("occupation").notNullable();
    table.date("dateOfGyan").notNullable();
    table.string("bloodGroup").notNullable();

    table.index("pincode");
    table.index("contactNo");
    table.index("gender");

    // Add more columns as needed
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("sadhsangat");
}
