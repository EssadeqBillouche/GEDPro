import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Role } from './entites/role.entity';
import { Repository } from 'typeorm';
import { Permession } from './entites/permession.entity';
import { RegisterDto } from './dtos/register.dto';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,

    @InjectRepository(Role)
    private RoleRepository: Repository<Role>,

    @InjectRepository(Permession)
    private PermissionRepisitory: Repository<Permession>,
  ) {}

  async findByEmail(userEmail: string) {
    const user = await this.UserRepository.findOne({
      where: { email: userEmail },
    });
    return user;
  }

  async login(email: string, password: string) {


    
  }

  async register(userdata: RegisterDto) {
    try {
      const user = await this.findByEmail(userdata.email);

      const hashedPassword = await bcrypt.hash(userdata.password, 10);
      userdata = { ...userdata, password: hashedPassword };

      if (user === null) {
        const newUser = this.UserRepository.create(userdata);
        return await this.UserRepository.save(newUser);
      }
      throw new NotFoundException('this email a ready exist, try to login');
    } catch (error) {
      throw error;
    }
  }
}
