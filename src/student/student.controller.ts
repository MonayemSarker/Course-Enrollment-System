import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { SignInDto } from 'src/dto/signin.dto';
import { AuthStudentService } from './auth-student.service';

@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private authService: AuthStudentService,
  ) {}

  @Post('signup')
  createStudent(@Body() body: CreateStudentDto) {
    const user = this.authService.signup(body);
    return user;
  }

  @Post('')
  loginStudent(@Body() body: SignInDto) {
    const user = this.authService.signin(body);
    return user;
  }
}
