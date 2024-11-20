import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  async login(loginUserDto: LoginUserDto) {

    const users:User[] = await this.dbService.read()

    const foundUser = users.find(user => user.username === loginUserDto.username)

    if(!foundUser) {
      throw new BadRequestException('user not found')
    }

    if(foundUser.password !== loginUserDto.password) {
      throw new BadRequestException('invalid password')
    } else {
      return foundUser
    }

  }

  @Inject(DbService)
  dbService: DbService;

  async register(registerUserDto: RegisterUserDto) {
    
    const users:User[] = await this.dbService.read()

    const foundUser = users.find(user => user.username === registerUserDto.username)
    if(foundUser) {
      throw new BadRequestException('user already exists')
    }
    const user = new User()
    user.username = registerUserDto.username
    user.password = registerUserDto.password
    users.push(user)
    await this.dbService.write(users)
    return user
  }
  
}
