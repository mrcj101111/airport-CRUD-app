exports.up = function(knex, Promise) {
    return knex.schema.alterTable('airport', table => {
        table.renameColumn('location', 'lat');
        table.decimal('long');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('airport', table => {
        table.renameColumn('lat', 'location');
        table.dropColumn('long');
    })
};
