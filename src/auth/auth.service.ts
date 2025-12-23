import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Role } from './entites/role.entity';
import { Repository } from 'typeorm';
import { Permession } from './entites/permession.entity';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
    
    constructor( 
        @InjectRepository(User)
        private UserRepository : Repository <User>,
        
        @InjectRepository(Role)
        private RoleRepository : Repository <Role>,
        
        @InjectRepository(Permession)
        private PermissionRepisitory : Repository <Permession>,

    ){}

    async findByEmail(userEmail : string){
        const user = this.UserRepository.findOne({where : { email : userEmail}})
        return user
    }

    async login(email : string, password : string){

    }
    async register(userdata : RegisterDto) {

        const user = this.findByEmail(userdata.email);

        if(!user){
            const newUser = this.UserRepository.create(userdata)
            return await this.UserRepository.save(newUser);
        }
        throw new NotFoundException("this email a ready exist, try to login") 
    }
}
