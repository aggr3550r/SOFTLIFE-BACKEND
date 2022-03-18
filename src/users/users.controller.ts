import { Body, Controller, Post, Get, Patch, Param, Query, Delete, Session, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { SignInDTO } from './dtos/signin.dto';


@Controller('auth')
@Serialize(UserDTO)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User){
         return user;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDTO, @Session() session: any)
    {
      const user = await this.authService.signup(body.email, body.password, body.username);
      session.userID = user.id;
      return user;
    }

    @Post('/signin')
    async signin(@Body() body: SignInDTO, @Session() session: any){
        const user = await this.authService.signin(body.email, body.password);
        session.userID = user.id;
        return user;
    }
    
    @Post('/signout')
    signOut(@Session() session: any){
        session.userID = null;
    }

     @Get('/:id')
     findUser(@Param('id') id: string){
         return this.usersService.findOne(parseInt(id));
     }

     @Get()
     findAllUsers(@Query('email') email: string) {
         return this.usersService.find(email);
     }

     @Delete('/:id')
     removeUser(@Param('id') id: string){
         return this.usersService.remove(parseInt(id));
     }

     @Patch('/:id')
     updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO){
         return this.usersService.update(parseInt(id), body);
     }
}
            