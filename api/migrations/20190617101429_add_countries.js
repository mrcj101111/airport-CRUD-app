exports.up = function (knex, Promise) {
    return knex('country', table => {
        table.insert([{ country_code: 'DE' }, { country_name: 'Germany' },
        { country_code: 'GB' }, { country_name: 'United Kingdom' },
        { country_code: 'IE' }, { country_name: 'Ireland' },
        { country_code: 'HR' }, { country_name: 'Croatia' },
        { country_code: 'AU' }, { country_name: 'Australia' },
        { country_code: 'US' }, { country_name: 'United States' },
        { country_code: 'ZA' }, { country_name: 'South Africa' },
        ]);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('country', table => {
        where({ country_code: 'DE' }).del();
        where({ country_code: 'GB' }).del();
        where({ country_code: 'IE' }).del();
        where({ country_code: 'HR' }).del();
        where({ country_code: 'AU' }).del();
        where({ country_code: 'US' }).del();
        where({ country_code: 'ZA' }).del();
    })
};
