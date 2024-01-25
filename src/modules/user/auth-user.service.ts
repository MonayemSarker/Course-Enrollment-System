import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Teacher } from '../teacher/teacher.entity';
import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';
import { Student } from '../student/student.entity';

const scrypt = promisify(_scrypt);
const salt = 'AABBCC';

@Injectable()
export class AuthUserService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private teacherService: TeacherService,
    private studentService: StudentService,
  ) {}

  async create(userDto: CreateUserDto) {
    const { password } = userDto;
    const hash = ((await scrypt(password, salt, 16)) as Buffer).toString();
    userDto.password = hash;
    const newUser = await this.userService.create(userDto);

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    if (newUser.userType === 'Teacher') {
      const teacher = new Teacher();
      teacher.id = newUser.id;
      teacher.name = newUser.name;
      teacher.email = newUser.email;
      await this.teacherService.create(teacher);
    } else if (newUser.userType === 'Student') {
      const student = new Student();
      student.id = newUser.id;
      student.name = newUser.name;
      student.email = newUser.email;
      await this.studentService.create(student);
    }
    return tokens;
  }

  async login(email: string, password: string) {
    const hash = ((await scrypt(password, salt, 16)) as Buffer).toString();

    const user = await this.userService.findByEmail(email);
    // console.log(user);
    if (user.password !== hash) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  logout(userId: number) {
    return this.userService.updateToken(userId, null);
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
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: JWT_REFRESH_TOKEN,
          expiresIn: '100d',
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
    await this.userService.updateToken(userId, hashedRefreshToken);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new BadRequestException('Access denied');
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
