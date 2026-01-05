import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/auth/Entites/Permission.entity';
import { Role } from 'src/auth/Entites/Role.entity';
import { User } from 'src/auth/Entites/User.entity';
import { Organization } from 'src/auth/Entites/Organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,

    @InjectRepository(Role)
    private RoleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private PermissionRepository: Repository<Permission>,

    @InjectRepository(Organization)
    private OrganizationRepository: Repository<Organization>,
  ) {}

  async findByEmail(userEmail: string) {
    return await this.UserRepository.findOne({
      where: { email: userEmail },
      relations: ['roles', 'organization'],
    });
  }

  async findById(id: string) {
    return await this.UserRepository.findOne({
      where: { id },
      relations: ['roles', 'organization'],
    });
  }

  async getRoleBySlug(slug: string) {
    return await this.RoleRepository.findOne({ where: { slug } });
  }

  async createUser(userData: Partial<User>) {
    const newUser = this.UserRepository.create(userData);
    return await this.UserRepository.save(newUser);
  }

  async updateRefreshToken(userId: string, refreshTokenHash: string) {
    await this.UserRepository.update(userId, { refreshTokenHash });
  }

  async updateLastLogin(userId: string) {
    await this.UserRepository.update(userId, { lastLogin: new Date() });
  }
}
