import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UsersModule } from '../users/users.module';

dotenv.config()

@Module({
  imports : [UsersModule,
    JwtModule.register({
      secret : process.env.JWTSECRET,
      signOptions : {expiresIn : '1d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
