const dbConfig = {
   synchronize: false,
   migrations: ['migrations/*.js'],
   cli: {
       migrationsDir: 'migrations',
   },
};

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'postgres',
            host:  process.env.DB_HOST,
            database: 'postgres',
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            entities: ['**/*.entity.js'],
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'postgres',
            host:  process.env.DB_HOST,
            database: 'postgres',
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            entities: ['**/*.entity.ts'],
            migrationsRun: true
        });
        break;
    case 'production':
        Object.assign(dbConfig, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            entities: ['**/*.entity.js'],
            ssl: {
                rejectUnauthorized: false,
            },
        });
        break;
      default:
          throw new Error('unknown environment');
}

module.exports = dbConfig;