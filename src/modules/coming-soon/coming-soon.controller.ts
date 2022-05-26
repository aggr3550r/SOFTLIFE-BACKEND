import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ComingSoonService } from './coming-soon.service';
import { AnticipatorDTO } from './dtos/anticipator.dto';
import { CreateAnticipatorDTO } from './dtos/create-anticipator.dto';
import { Anticipator } from './entities/anticipator.entity';

@Controller('coming-soon')
@Serialize(AnticipatorDTO)
export class ComingSoonController {
  constructor(private comingSoonService: ComingSoonService) {}

  @Post()
  create(@Body() body: CreateAnticipatorDTO): Promise<Anticipator> {
    return this.comingSoonService.create(body.email);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<Anticipator[]> {
    return this.comingSoonService.findAll();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  removeUser(@Param('id') id: string): Promise<Anticipator> {
    return this.comingSoonService.remove(parseInt(id));
  }
}
