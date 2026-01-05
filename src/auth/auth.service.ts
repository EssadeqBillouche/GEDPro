import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/Login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const payload = {
        sub: user.id,
        email: user.email,
        roles: user.roles.map(r => r.slug),
        orgId: user.organization?.id
      };

      const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      // Hash refresh token and save to DB
      const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
      await this.userService.updateRefreshToken(user.id, refreshTokenHash);
      await this.userService.updateLastLogin(user.id);

      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  async register(userdata: RegisterDto) {
    const user = await this.userService.findByEmail(userdata.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    // Assuming 'role' in DTO is a slug now, default to 'user' if not provided
    const roleSlug = userdata.role || 'user';
    const role = await this.userService.getRoleBySlug(roleSlug);
    
    if (!role) {
      throw new NotFoundException(`Role '${roleSlug}' not found`);
    }

    const hashedPassword = await bcrypt.hash(userdata.password, 10);

    const newUser = await this.userService.createUser({
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      email: userdata.email,
      passwordHash: hashedPassword,
      roles: [role],
      // Organization logic would go here (e.g., create new or assign existing)
    });

    const { passwordHash, refreshTokenHash, ...result } = newUser;
    return result;
  }

  async refreshSession(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshTokenHash) throw new UnauthorizedException('Access Denied');

    const isMatch = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!isMatch) throw new UnauthorizedException('Invalid Refresh Token');

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map(r => r.slug),
      orgId: user.organization?.id
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    return { accessToken };
  }

  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
  }
}
