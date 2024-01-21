import { Injectable } from '@nestjs/common';
import { StudentService } from './student.service';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateStudentDto } from './dto/create-student.dto';
import { SignInDto } from 'src/dto/signin.dto';

const scrypt = promisify(_scrypt);
const salt = 'AABBCC';

@Injectable()
export class AuthStudentService {
  constructor(private studentService: StudentService) {}

  async signup(studentDto: CreateStudentDto) {
    // const salt = this.configService.get<string>('SALT');
    const hash = (await scrypt(studentDto.password, salt, 16)) as Buffer;

    studentDto.password = hash.toString();

    const student = this.studentService.signup(studentDto); //

    return student;
  }

  async signin(signinDto: SignInDto) {
    const hash = (await scrypt(signinDto.password, salt, 16)) as Buffer;
    signinDto.password = hash.toString();

    const student = this.studentService.signin(
      signinDto.email,
      signinDto.password,
    );
    return student;
  }
}
