const { MigrationInterface, QueryRunner, Table } = require('typeorm');
 
module.exports = class initialSchema1625847615203 {
  name = 'initialSchema1625847615203';
 
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'admin',
            type: 'boolean',
            default: 'true',
          },
        ],
      }),
    );
    }

    async up(queryRunner) {
        await queryRunner.createTable(
          new Table({
            name: 'anticipator',
            columns: [
              {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'email',
                type: 'varchar',
              }
            ],
          }),
        );
        }

        async down(queryRunner) {
            await queryRunner.query(`DROP TABLE ""report""`);
            await queryRunner.query(`DROP TABLE ""user""`);
          }
    
    
};