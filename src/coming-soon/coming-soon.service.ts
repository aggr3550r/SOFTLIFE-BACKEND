import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Anticipator } from './entities/anticipator.entity';


@Injectable()
export class ComingSoonService {
    constructor(@InjectRepository(Anticipator) private repo: Repository<Anticipator>){}

    create(email: string) {
        const anticipator = this.repo.create({email});
        return this.repo.save(anticipator);
    }

    find(email: string){
        return this.repo.find({email});
    }

    async findOne(id: number) {
        if(!id) return null;
        const user = await this.repo.findOne(id);
        if(!user) throw new NotFoundException("Couldn't find that ID!")
        return user;
    }

    async findAll() {
        const users = await this.repo.find({select: ['email']});
        return users;
    }
    
}
