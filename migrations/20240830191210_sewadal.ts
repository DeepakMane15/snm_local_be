const Knex = require('knex');

/**
 * Run the migrations.
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  return knex.schema.createTable('sewadal', function (table) {
    table.increments('id').primary();
    table.integer('sID').notNullable().unsigned();
    table.foreign('sID').references('id').inTable('sadhsangat').onDelete('CASCADE');
    table.integer('personalNo').nullable().unique();
    table.string('sewadalNo').nullable().unique();
    table.date('recruitmentDate').notNullable().unique();
    table.index(['sID', 'personalNo', 'sewadalNo']);
  });
};

/**
 * Rollback the migrations.
 *
 * @param {Knex} knex
 */
exports.down = async function (knex) {
  return knex.schema.dropTableIfExists('sewadal');
};
