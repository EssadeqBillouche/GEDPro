import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typeOrm.config';
import { UsersModule } from './users/users.module';
import { DocumentModule } from './document/document.module';
import { CandidateModule } from './candidate/candidate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : '.env'
    }),
    TypeOrmModule.forRoot(TypeOrmConfig),
    AuthModule,
    UsersModule,
    DocumentModule,
    CandidateModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
