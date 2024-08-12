import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('family_hof_mapping', function(table) {
        table.increments('id').primary();
        table.integer('hof').notNullable().unsigned(); // 'unsigned' is often needed for foreign keys
        table.foreign('hof').references('id').inTable('sadhsangat').onDelete('CASCADE');
        table.index('hof');
        // 'onDelete("CASCADE")' ensures that deleting a row in 'sadhsangat' also deletes dependent rows in 'family_hof_mapping'
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('family_hof_mapping');
}

