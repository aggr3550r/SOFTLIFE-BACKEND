import { Module } from '@nestjs/common';
import { ComingSoonService } from './coming-soon.service';
import { ComingSoonController } from './coming-soon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnticipatorRepository } from './repository/anticipator.repository';
import { Anticipator } from './entities/anticipator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anticipator ,AnticipatorRepository])],
  exports: [TypeOrmModule.forFeature([AnticipatorRepository])],
  providers: [ComingSoonService],
  controllers: [ComingSoonController]
})
export class ComingSoonModule {}
