exports.up = function(knex, Promise) {
    return knex.schema.createTable('routes', table => {
        table.increments('routes_id');
        table.integer('from');
        table.integer('to');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('routes')
};
