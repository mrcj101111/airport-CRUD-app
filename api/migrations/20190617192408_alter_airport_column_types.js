exports.up = function(knex, Promise) {
    return knex.schema.alterTable('airport', table => {
        table.integer('country_id').alter();
        table.integer('airline_id').alter();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('airport', table => {
        table.string('country_id').alter();
        table.string('airline_id').alter();
    })
};
