import { Controller, Get, Param, Post , Body, ValidationPipe, BadRequestException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body( new ValidationPipe(),) registerDto : RegisterDto, res : Response)
  {
    try{
          return await this.authService.register(registerDto)
    }catch(error){
      throw new BadRequestException(error.message)
    }
  }
}
