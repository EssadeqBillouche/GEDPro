import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/Login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
   
    private jwtService: JwtService,

    private userService : UsersService
  ) {}

  

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.jwtService.sign({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
      return { AccessToken: token };
    } else {
      throw new NotFoundException(' this email or password not valid');
    }
  }

  async register(userdata: RegisterDto) {
    try {
      const user = await this.userService.findByEmail(userdata.email);

      const hashedPassword = await bcrypt.hash(userdata.password, 10);
      userdata = { ...userdata, password: hashedPassword };

      const role = await this.userService.getRole(userdata.role)

      if (user && role) {
        const {password , id, refresh_Token, ...registered_User} = await this.userService.createUser({...user, password :hashedPassword})
      }else {
              throw new NotFoundException('this email a ready exist, try to login');
      }

    } catch (error) {
      throw error;
    }
  }

  async refreshToken(){

    const token = this.jwtService.verify
    
  }
}
