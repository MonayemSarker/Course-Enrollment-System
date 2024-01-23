import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll() {
    const users = await this.repo.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    console.log(id);

    const user = await this.repo.findOne({
      where: { id: parseInt(id) },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repo.find({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException('No User found');
    }
    return user[0];
  }

  async create(userDto: CreateUserDto) {
    const alreadyExistUser = await this.repo.findOne({
      where: { email: userDto.email },
    });

    if (alreadyExistUser) {
      throw new BadRequestException('User already exists');
    }
    const user = await this.repo.create(userDto);
    return this.repo.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.repo.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.password === password) {
      return user;
    }
  }

  async update(id: number, refreshToken: string) {
    const user = await this.repo.findOne({
      where: { id: id },
    });
    user.refreshToken = refreshToken;
    return this.repo.save(user);
  }

  isLoggedIn() {}

  logout() {}
}
