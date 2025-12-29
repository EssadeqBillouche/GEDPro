import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/Entites/User.entity';
import { Role } from 'src/auth/Entites/Role.entity';
import { Permission } from 'src/auth/Entites/Permission.entity';

@Module({
    imports : [TypeOrmModule.forFeature([User,Role,Permission])],
    providers : [UsersService],
    exports : [UsersService]
})
export class UsersModule {}
