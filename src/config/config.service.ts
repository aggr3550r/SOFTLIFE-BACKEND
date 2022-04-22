import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      Logger.log('Value missing for ', key);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode == 'production';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')) || 5432,
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['../../migrations/*.js'],

      cli: {
        migrationsDir: '../../migrations'
      },

      //ssl: this.isProduction(),

      ssl: {
        rejectUnauthorized: false
      },

      synchronize: true
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD'
]);

export { configService };
