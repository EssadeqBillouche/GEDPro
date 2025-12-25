import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './Entites/Role.entity';
import { User } from './Entites/User.entity';
import { Permession } from './Entites/Permession.entity';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports : [
    TypeOrmModule.forFeature([Role, User, Permession]),
    JwtModule.register({
      secret : process.env.JWTSECRET,
      signOptions : {expiresIn : '1d'}
    })
  ]
  ,
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
