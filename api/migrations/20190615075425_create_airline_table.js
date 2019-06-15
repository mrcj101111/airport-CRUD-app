exports.up = function (knex, Promise) {
    return knex.schema.createTable('airline', table => {
        table.increments('airline_id');
        table.string('airline_name');
        table.integer('country_id');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('airline')
};
