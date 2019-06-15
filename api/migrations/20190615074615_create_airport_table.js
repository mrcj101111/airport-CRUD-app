exports.up = function (knex, Promise) {
    return knex.schema.createTable('airport', table => {
        table.increments('airport_id');
        table.string('name');
        table.decimal('location');
        table.string('country_id');
        table.string('airline_id');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('airport')
};