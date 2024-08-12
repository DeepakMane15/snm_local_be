import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('family_members', function(table) {
        table.increments('id').primary();
        table.integer('familyId').notNullable().unsigned(); // 'unsigned' is often needed for foreign keys
        table.integer('memberId').notNullable().unsigned(); // 'unsigned' is often needed for foreign keys
        table.foreign('memberId').references('id').inTable('sadhsangat').onDelete('CASCADE');
        table.foreign('familyId').references('id').inTable('family_hof_mapping').onDelete('CASCADE');
        table.index('familyId');
        table.index('memberId');
        // 'onDelete("CASCADE")' ensures that deleting a row in 'sadhsangat' also deletes dependent rows in 'family_hof_mapping'
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('family_members');
}

