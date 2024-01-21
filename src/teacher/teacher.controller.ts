import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherService } from './teacher.service';
import { SignInDto } from 'src/dto/signin.dto';
import { AuthTeacherService } from './auth-teacher.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

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

  @UseGuards(LocalAuthGuard)
  @Post('')
  loginTeacher(@Body() body: SignInDto) {
    console.log('request to controller?');
    const user = this.authService.signin(body);
    console.log('controller user' + user);
    return user;
  }
}
