import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email: string, password:string){
        const user = this.repo.create({email, password});

        return this.repo.save(user);
    }

    find(email: string) {
        return this.repo.find({email});
    }

    findOne(id: number) {
        if(!id){
            return null;
        }
        return this.repo.findOne(id);
    }

    async update(id: number, body: UpdateUserDTO){
        const user = await this.repo.findOne(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }

        Object.assign(user, body);
        return this.repo.save(user); 
    }

    async remove(id: number){
        const user = await this.repo.findOne(id);
        if(!user){
            throw new NotFoundException("User does not exist");
            
        }
        return this.repo.remove(user);
    }
}
