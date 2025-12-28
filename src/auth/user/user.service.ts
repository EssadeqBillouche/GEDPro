import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(private configService : ConfigService){

    }

    create(){
        const port = this.configService.get('')
    }
}
