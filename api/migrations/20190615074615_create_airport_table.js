exports.up = function (knex, Promise) {
    return knex.schema.createTable('airport', table => {
        table.increments('airport_id');
        table.string('name');
        table.decimal('long');
        table.decimal('lat');
        table.integer('country_id');
        table.integer('airport_airline_id');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('airport')
};