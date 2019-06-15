exports.up = function (knex, Promise) {
    return knex.schema.createTable('country', table => {
        table.increments('country_id');
        table.integer('country_code');
        table.string('country_name');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('country')
};
