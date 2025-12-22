import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://essadeqbillouche_db_user1:icz3Bwfdu0q66Tki@gedpro.7vd8iwn.mongodb.net/?appName=GEDPro"),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port : 5432,
      username : "postgres",
      password : "11111",
      database: 'GED_PRO',
    }),

    ConfigModule.forRoot(),

    AuthModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
