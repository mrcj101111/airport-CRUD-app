exports.up = function (knex, Promise) {
    return knex.schema.createTable('country', table => {
        table.increments('country_id');
        table.string('country_code');
        table.string('country_name');
    }).then(() => {
        return knex('country').insert([
            { country_code: 'DE', country_name: 'Germany' },
            { country_code: 'GB', country_name: 'United Kingdom' },
            { country_code: 'IE', country_name: 'Ireland' },
            { country_code: 'HR', country_name: 'Croatia' },
            { country_code: 'AU', country_name: 'Australia' },
            { country_code: 'US', country_name: 'United States' },
            { country_code: 'ZA', country_name: 'South Africa' },
        ]);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('country')
};
