import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from 'src/auth/Entites/User.entity';
import { Role } from 'src/auth/Entites/Role.entity';
import { Permission } from 'src/auth/Entites/Permission.entity';
import { Organization } from 'src/auth/Entites/Organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission, Organization])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
