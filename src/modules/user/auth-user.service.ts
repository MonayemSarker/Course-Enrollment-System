import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

const scrypt = promisify(_scrypt);
const salt = 'AABBCC';

@Injectable()
export class AuthUserService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async create(userDto: CreateUserDto) {
    const { password } = userDto;
    const hash = ((await scrypt(password, salt, 16)) as Buffer).toString();
    userDto.password = hash;
    const newUser = await this.userService.create(userDto);

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async login(email: string, password: string) {
    const hash = ((await scrypt(password, salt, 16)) as Buffer).toString();

    const user = await this.userService.findByEmail(email);
    console.log(user);
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    return await this.userService.update(userId, null);
  }

  async getTokens(userId: number, email: string) {
    const JWT_SECRET_KEY = 'ABCDEFGHIJ';
    const JWT_REFRESH_TOKEN = 'This should be random token';
    const [accesstoken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: JWT_SECRET_KEY,
          expiresIn: '10m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: JWT_REFRESH_TOKEN,
          expiresIn: '7d',
        },
      ),
    ]);
    return { accesstoken, refreshToken };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, hashedRefreshToken);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
