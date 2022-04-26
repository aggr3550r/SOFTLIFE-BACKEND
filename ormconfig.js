const dbConfig = {
   synchronize: false,
   retryAttempts: 3,
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
            database: 'softlifedb',
            port: process.env.DB_PORT,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DB_PASSWORD,
            entities: ['**/*.entity.js'],
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'postgres',
            host:  process.env.DB_HOST,
            database: 'softlifedb',
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            entities: ['**/*.entity.js'],
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