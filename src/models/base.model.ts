import { winstonLogger } from 'src/utils/winston';
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @AfterInsert()
  logInsert() {
    winstonLogger.info('Inserted a record with an ID of ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    winstonLogger.info('Updated a record with an ID of ', this.id);
  }

  @AfterRemove()
  logRemove() {
    winstonLogger.info('Removed a record with an ID of', this.id);
  }
}
