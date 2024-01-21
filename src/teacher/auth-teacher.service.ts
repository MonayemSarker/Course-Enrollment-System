import { Injectable } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { SignInDto } from 'src/dto/signin.dto';

const scrypt = promisify(_scrypt);
const salt = 'AABBCC';

@Injectable()
export class AuthTeacherService {
  constructor(private teacherService: TeacherService) {}

  async signup(teacherDto: CreateTeacherDto) {
    // const salt = this.configService.get<string>('SALT');
    const hash = (await scrypt(teacherDto.password, salt, 16)) as Buffer;

    teacherDto.password = hash.toString();

    const teacher = this.teacherService.signup(teacherDto); //

    return teacher;
  }

  async signin(signinDto: SignInDto) {
    const hash = (await scrypt(signinDto.password, salt, 16)) as Buffer;
    signinDto.password = hash.toString();

    const teacher = this.teacherService.signin(
      signinDto.email,
      signinDto.password,
    );
    console.log('auth teacher user' + teacher);
    return teacher;
  }
}
