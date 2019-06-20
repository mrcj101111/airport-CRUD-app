exports.up = function(knex, Promise) {
    return knex.schema.createTable('airport_airline', table => {
        table.increments('airport_airline_id');
        table.integer('airport_id');
        table.integer('airline_id');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('airport_airline')
};
