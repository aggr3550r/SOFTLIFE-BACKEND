import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { winstonLogger } from 'src/utils/winston';
import { User } from '../entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(create_user_dto: CreateUserDTO): Promise<User> {
    try {
      const users = await this.usersService.find(create_user_dto.email);
      if (users.length) {
        throw new BadRequestException('Email in use!');
      }
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(create_user_dto.password, salt, 32)) as Buffer;

      const password = salt + '.' + hash.toString('hex');

      create_user_dto.password = password;
      const user = await this.usersService.create(create_user_dto);
      return user;
    } catch (error) {
      winstonLogger.error('User Signup error \n %s', error);
    }
  }

  async signin(email: string, password: string) {
    try {
      const [user] = await this.usersService.find(email);

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      const [salt, storedHash] = user.password.split('.');

      const hash = (await scrypt(password, salt, 32)) as Buffer;

      if (storedHash !== hash.toString('hex')) {
        throw new BadRequestException('Invalid email or password!');
      }

      return user;
    } catch (error) {
      winstonLogger.error('User Signin error \n %s', error);
    }
  }
}
