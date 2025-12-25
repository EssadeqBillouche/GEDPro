import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entites/User.entity';
import { Role } from './Entites/Role.entity';
import { Repository } from 'typeorm';
import { Permession } from './Entites/Permession.entity';
import { RegisterDto } from './dtos/register.dto';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/Login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,

    @InjectRepository(Role)
    private RoleRepository: Repository<Role>,

    @InjectRepository(Permession)
    private PermissionRepisitory: Repository<Permession>,

    private jwtService: JwtService,
  ) {}

  async findByEmail(userEmail: string) {
    const user = await this.UserRepository.findOne({
      where: { email: userEmail },
    });
    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.findByEmail(email);
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
      const user = await this.findByEmail(userdata.email);

      const hashedPassword = await bcrypt.hash(userdata.password, 10);
      userdata = { ...userdata, password: hashedPassword };

      const role = await this.RoleRepository.findOne({where : { name : userdata.role}})

      if (user === null && role) {
        const {password , id, refresh_Token, ...registered_User} = await this.UserRepository.save({
          firstName : userdata.firstName,
          lastName : userdata.lastName,
          email : userdata.lastName,
          password : userdata.password,
          role : role
        });
        return registered_User
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
