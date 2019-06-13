module.exports = {
    development: {
      client: 'postgresql',
      connection: {
        database: 'airport',
        user:     'postgres',
        password: 'password'
      }
    },
  
    staging: {
      client: 'postgresql',
      connection: {
        database: 'airport',
        user:     '',
        password: ''
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        database: 'airport',
        user:     '',
        password: ''
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  };
  