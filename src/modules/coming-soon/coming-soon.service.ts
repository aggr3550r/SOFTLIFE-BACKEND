import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnticipatorRepository } from './repository/anticipator.repository';


@Injectable()
export class ComingSoonService {
    constructor(@InjectRepository(AnticipatorRepository) private anticipatorRepository: AnticipatorRepository){}

    create(email: string) {
        if(this.anticipatorRepository.find({email})){
            throw new NotAcceptableException("You are already on the waiting list!");
        }
        const anticipator = this.anticipatorRepository.create({email});
        return this.anticipatorRepository.save(anticipator);
    }

    find(email: string){
        return this.anticipatorRepository.find({email});
    }

    async findOne(id: number) {
        if(!id) return null;
        const anticipator = await this.anticipatorRepository.findOne(id);
        if(!anticipator) throw new NotFoundException("Couldn't find that ID!")
        return anticipator;
    }

    async findAll() {
        const anticipators = await this.anticipatorRepository.find({select: ['email']});
        return anticipators;
    }
    
    async remove(id: number) {
        if(!id) return null;
        const anticipator = await this.anticipatorRepository.findOne(id);
        if(!anticipator) {
            throw new NotFoundException("User does not exist");
        }
        return this.anticipatorRepository.remove(anticipator);
    }
    
}
