import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('sadhsangat', function (table) {
        // Adding the foreign key constraint
        table.foreign('unitNo').references('id').inTable('units_master').onDelete('CASCADE');
        
        // Adding an index to the unitNo column
        table.index('unitNo');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('sadhsangat', function (table) {
        // Dropping the foreign key constraint
        table.dropForeign('unitNo');
        
        // Dropping the index on unitNo
        table.dropIndex('unitNo');
    });
}
