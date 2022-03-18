import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from ".././users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
 

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async signup(email: string, password: string, username: string){
        //SEE IF EMAIL IS IN USE

        const users = await this.usersService.find(email);
        if (users.length){
            throw new BadRequestException("Email in use!");
        }

        //HASH USER PASSWORD

        //Generate a salt
         const salt = randomBytes(8).toString('hex');

         //Hash the salt and the password together
         const hash = await (scrypt(password, salt, 32)) as Buffer;

         //Join the hashed result and the salt together
         const result = salt + '.' + hash.toString('hex');

        //CREATE AND SAVE NEW USER

        const user = await this.usersService.create(email, result, username);

        //RETURN SAVED USER 
        
        return user;

    }

    async signin(email: string, password: string){
        const [user] = await this.usersService.find(email);

        if (!user) {
            throw new NotFoundException("User not found!");
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32))as Buffer;
                
        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException("Invalid email or password!");
        }

        return user;
    }
}