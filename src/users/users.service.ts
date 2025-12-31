import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/auth/Entites/Permission.entity';
import { Role } from 'src/auth/Entites/Role.entity';
import { User } from 'src/auth/Entites/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        
    @InjectRepository(User)
    private UserRepository : Repository<User>,

    @InjectRepository(Role)
    private RoleRepository : Repository<Role>,

    @InjectRepository(Permission)
    private PermissionRepository : Repository<Permission>
    

){}

async findByEmail(userEmail: string) {
    const user = await this.UserRepository.findOne({
      where: { email: userEmail },
    });
    return user;
  }


  async getRole(role_Name : string){
    return await this.RoleRepository.findOne({where : {name : role_Name}})
  }

  async createUser( userData ){

    const registeredUser = this.UserRepository.create(userData);
    return await this.UserRepository.save(registeredUser)

  }
}
