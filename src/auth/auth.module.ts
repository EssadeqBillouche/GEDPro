import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entites/role.entity';
import { User } from './entites/user.entity';
import { Permession } from './entites/permession.entity';
import { UserService } from './user/user.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([Role, User, Permession])
  ]
  ,
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
