import { Module } from '@nestjs/common';
import { ComingSoonService } from './coming-soon.service';
import { Anticipator } from './entities/anticipator.entity';
import { ComingSoonController } from './coming-soon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Anticipator])],
  providers: [ComingSoonService],
  controllers: [ComingSoonController]
})
export class ComingSoonModule {}
