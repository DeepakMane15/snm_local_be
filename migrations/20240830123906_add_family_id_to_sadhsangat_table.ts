import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("sadhsangat", function (table) {
    table.integer("familyId").unsigned().nullable();

    // Add the foreign key constraint referencing the family_hof_mapping table
    table
      .foreign("familyId")
      .references("id")
      .inTable("family_hof_mapping")
      .onDelete("CASCADE");

    // Optionally, you can index the familyId column if you plan to query by it often
    table.index("familyId");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("sadhsangat", function (table) {
    table.dropColumn("familyId");
  });
}
