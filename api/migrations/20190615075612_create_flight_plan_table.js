exports.up = function (knex, Promise) {
    return knex.schema.createTable('flight_plan', table => {
        table.increments('flight_plan_id');
        table.integer('route_id');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('flight_plan')
};
