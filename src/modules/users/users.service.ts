import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository){}

    create(email: string, password:string, username: string): Promise<User>{
        if(!email || !password){
            return null;
        }
        const user = this.userRepository.create({email, password, username});
        return this.userRepository.save(user);
    }

    find(email: string): Promise<User[]> {
        if(!email){
            return null;
        }
        return this.userRepository.find({email});
    }

    async findAllEmails(): Promise<User[]> {
        const users_emails = await this.userRepository.find({select: ['email']});
        return users_emails;
    }

    findOne(id: string): Promise<User> {
        if(!id){
            return null;
        }
        return this.userRepository.findOne(id);
    }

    async update(id: string, body: UpdateUserDTO): Promise<User>{
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        Object.assign(user, body);
        return this.userRepository.save(user); 
    }

    async remove(id: string): Promise<User>{
        const user = await this.userRepository.findOne(id);
        if(!user){
            throw new NotFoundException("User does not exist"); 
        }
        return this.userRepository.remove(user);
    }
}
