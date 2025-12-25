import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './Entites/User.entity';
import { Repository } from 'typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService, @InjectRepository(User) private userRepository : Repository<User>)  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWTSECRET'),
    });
  }

  async validate(payload: any) {

    const {userId } = payload
    const user = this.userRepository.findOne({where : {id : userId}})
    
    if(!user)
    return { userId: payload.sub, username: payload.username };
  }
}
