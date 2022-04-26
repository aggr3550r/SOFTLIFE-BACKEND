import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository){}

    create(email: string, password:string, username: string){
        if(!email || !password){
            return null;
        }
        const user = this.userRepository.create({email, password, username});
        return this.userRepository.save(user);
    }

    find(email: string) {
        if(!email){
            return null;
        }
        return this.userRepository.find({email});
    }

    async findAllEmails() {
        const users = await this.userRepository.find();
        const emails = [];
        users.forEach(e => {
            emails.push(e.email);
        });
        return emails;
    }

    findOne(id) {
        if(!id){
            return null;
        }
        return this.userRepository.findOne(id);
    }

    async update(id: number, body: UpdateUserDTO){
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        Object.assign(user, body);
        return this.userRepository.save(user); 
    }

    async remove(id){
        const user = await this.userRepository.findOne(id);
        if(!user){
            throw new NotFoundException("User does not exist"); 
        }
        return this.userRepository.remove(user);
    }
}
