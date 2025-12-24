import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typeOrm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot(TypeOrmConfig),
    AuthModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
