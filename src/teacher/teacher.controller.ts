import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherService } from './teacher.service';
import { SignInDto } from 'src/dto/signin.dto';
import { AuthTeacherService } from './auth-teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private authService: AuthTeacherService,
  ) {}

  @Post('signup')
  createTeacher(@Body() body: CreateTeacherDto) {
    // const user = this.teacherService.signup(body);
    const teacher = this.authService.signup(body);
    return teacher;
  }

  @Post('')
  loginTeacher(@Body() body: SignInDto) {
    const user = this.authService.signin(body);
    return user;
  }
}
